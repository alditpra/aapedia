---
title: "Mengambil Data Jurnal Tanpa Ribet: Cerita di Balik Otomatisasi dengan Python"
meta_title: "Mengambil Data Jurnal Tanpa Ribet: Cerita di Balik Otomatisasi dengan Python"
description: "Capek salin data dari banyak jurnal satu per satu? Saya juga. Di artikel ini, saya bagikan pengalaman membuat alat otomatis dengan Python untuk mengumpulkan data artikel jurnal dari ribuan situs OJS. Cocok untuk peneliti, mahasiswa, atau siapa pun yang butuh data"

image: "../../assets/images/post4/cover4.webp"
authors: ["alditpra"]
categories: ["Automation"]
tags: ["Python", "Selenium", "OJS", "Web Scraping", "Tutorial"]
---
Mengumpulkan data dari puluhan situs jurnal secara manual adalah pekerjaan yang sangat melelahkan. Saya pernah merasakannya sendiri—seperti pekerjaan entri data yang tidak ada habisnya. Untungnya, setelah beberapa kali trial and error, saya menemukan pendekatan yang cukup andal untuk mengotomatisasi proses ini menggunakan Python dan Selenium.

Tulisan ini adalah rangkuman pengalaman saya dalam membangun skrip untuk mengambil data artikel dari situs berbasis **Open Journal Systems (OJS)**. Ini bukan sekadar tutorial *copy-paste*, melainkan catatan lapangan tentang mengapa saya memilih pendekatan tertentu dan bagaimana saya mengatasi berbagai masalah tak terduga.

## Bagian 1: Konteks & Pilihan Teknologi

### 1.1 Kenapa Selenium, Bukan Requests + BeautifulSoup?

Pertanyaan ini pasti muncul pertama kali. Awalnya, saya juga berpikir `requests` dan `BeautifulSoup` sudah lebih dari cukup. Namun, kenyataannya di lapangan lebih rumit.

Masalah utamanya adalah **banyak situs jurnal modern dilindungi oleh layanan anti-bot seperti Cloudflare**. Setiap kali saya mencoba menggunakan `requests`, hasilnya selalu gagal—diblokir dengan pesan "Access Denied" atau kena *rate limit*. Mengakali proteksi ini dengan *header* palsu atau *proxy* sederhana sudah tidak lagi efektif.

> **Selenium menjadi solusi pamungkas.** Karena Selenium mengotomatisasi *browser* sungguhan (seperti Chrome atau Firefox), dari sisi server, aktivitas scraping terlihat seperti lalu lintas pengguna biasa.

| Pendekatan             | Kelebihan                                   | Kelemahan                                   |
| ---------------------- | ------------------------------------------- | ------------------------------------------- |
| `requests` + `bs4` | Sangat cepat, ringan, resource-nya hemat    | Mudah diblokir oleh anti-bot (Cloudflare)   |
| `Selenium`           | Tingkat keberhasilan tinggi, bisa handle JS | Lebih lambat, butuh lebih banyak memori/CPU |

Meskipun lebih lambat, **tingkat keberhasilan yang jauh lebih tinggi membuat Selenium *worth it* untuk tugas ini.**

## Bagian 2: Arsitektur Skrip yang Robust

Pengalaman mengajarkan saya bahwa skrip yang baik harus fleksibel dan tahan banting.

### 2.1 Konfigurasi Fleksibel di Awal

Saya selalu memulai dengan blok konfigurasi di bagian atas skrip. Ini krusial karena kebutuhan setiap proyek bisa berbeda. Kadang saya hanya butuh *scrape* beberapa jurnal untuk testing, kadang butuh memproses ratusan sekaligus.

```python
# --- Konfigurasi ---
FILE_INPUT_JURNAL = "comotdarisini.xlsx"
JUMLAH_JURNAL_DARI_EXCEL = 3  # Set ke None untuk memproses semua
JUMLAH_ISU_TERAKHIR = 3
JEDA_REQUEST_DETIK = 3
PAGE_LOAD_TIMEOUT_DETIK = 20
RETRY_ATTEMPTS = 3
```

> Parameter `JUMLAH_JURNAL_DARI_EXCEL` sangat berguna saat development. Saya set ke angka kecil dulu, dan setelah yakin semua berjalan lancar, baru saya ubah menjadi `None` untuk eksekusi penuh.

### 2.2 Mekanisme Retry: Antisipasi Kegagalan

Internet tidak selalu stabil dan server jurnal bisa saja lambat atau *down*. Tanpa mekanisme *retry*, satu kegagalan bisa menghentikan seluruh proses.

```python
def get_page_source(driver, url, retries=RETRY_ATTEMPTS):
    for attempt in range(retries):
        try:
            driver.get(url)
            WebDriverWait(driver, 30).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            time.sleep(JEDA_REQUEST_DETIK)
            return driver.page_source
        except Exception as e:
            logging.warning(f"Gagal memuat {url} (Percobaan {attempt + 1}): {e}")
            if attempt < retries - 1:
                time.sleep(JEDA_REQUEST_DETIK)
            else:
                logging.error(f"Gagal total memuat URL {url} setelah {retries} percobaan.")
    return None
```

## Bagian 3: Strategi Mengatasi Keberagaman OJS

### 3.1 Tantangan: Struktur URL yang Tidak Konsisten

URL halaman arsip bisa sangat bervariasi: `/archive`, `/issue/archive`, atau pola lainnya.

Solusinya: membuat fungsi untuk *membangun* URL arsip langsung berdasarkan pola umum.

```python
from urllib.parse import urljoin

def temukan_url_arsip(url_utama):
    cleaned_url = url_utama.rstrip('/')
    if cleaned_url.endswith('/index') or cleaned_url.endswith('/about'):
        base_url = cleaned_url[:-6]
    else:
        base_url = cleaned_url

    url_arsip_lengkap = urljoin(base_url + '/', 'issue/archive')
    return url_arsip_lengkap
```

> Pendekatan ini jauh lebih andal karena tidak bergantung pada elemen HTML di homepage yang bisa berubah-ubah.

### 3.2 Tantangan: Struktur HTML yang Berbeda-beda

Untuk mengatasi variasi struktur antar-versi OJS, saya menerapkan **strategi multi-selector** di dua tahap:

1. Saat mencari link isu
2. Saat mencari link artikel

```python
possible_selectors = [
    'ul.issues_archive a.title',
    'div.obj_issue_summary a.title',
    'div#issues h2 a',
    'td.tocTitle a'
]

for selector in possible_selectors:
    links = soup.select(selector)
    if links:
        logging.info(f"Ditemukan link menggunakan selector: '{selector}'")
        break
```

> Ini seperti mencoba beberapa anak kunci sampai menemukan yang pas—sederhana tapi sangat efektif.

## Bagian 4: Ekstraksi Data & Etika Scraping

### 4.1 Ekstraksi Data yang Adaptif

Struktur data OJS sering tidak konsisten. Misalnya:

* **Kata kunci** bisa berada di `div.item.keywords` (OJS 3) atau `div#articleSubject` (OJS 2)
* **DOI** bisa berupa teks biasa atau link, kadang pakai label "DOI:"

Untuk DOI, kombinasi selector dan regex digunakan:

```python
import re

raw_doi_text = ""
doi_element_modern = soup.select_one('.item.doi .value')
if doi_element_modern:
    raw_doi_text = doi_element_modern.get_text()

if raw_doi_text:
    match = re.search(r'(10\.\d{4,9}/[-._;()/:A-Z0-9]+)', raw_doi_text, re.I)
    if match:
        doi = 'https://doi.org/' + match.group(1)
```

### 4.2 Etika Scraping: Kunci Utama

Scraping membebani server. Melakukannya secara etis adalah kewajiban.

| Prinsip Etika     | Implementasi Teknis                      | Alasan                                     |
| ----------------- | ---------------------------------------- | ------------------------------------------ |
| Jangan Agresif    | `time.sleep(JEDA_REQUEST_DETIK)`       | Memberi jeda agar server tidak terbebani   |
| Identifikasi Diri | Gunakan `User-Agent` browser sungguhan | Menunjukkan bahwa kita bukan bot berbahaya |
| Performa          | Gunakan*headless browser* default      | Menghemat resource                         |
| Logging           | `logging.basicConfig(...)`             | Memudahkan troubleshooting                 |

> Ingat, kita menggunakan sumber daya milik orang lain. Bersikaplah seperti tamu yang baik.

## Bagian 5: Hasil Akhir & Kesimpulan

### Contoh Output

Setelah semua proses selesai, skrip akan menghasilkan file Excel `hasil_scraping_multi_jurnal.xlsx` dengan tabel seperti berikut:

| No | SINTA | Tanggal Terbit | Judul Artikel                                | Kata Kunci                        | Abstrak                                                       | Link PDF         | URL Artikel        | DOI              | Judul Jurnal                   |
| -- | ----- | -------------- | -------------------------------------------- | --------------------------------- | ------------------------------------------------------------- | ---------------- | ------------------ | ---------------- | ------------------------------ |
| 1  | S2    | 2024-03-15     | Analisis Strategi UMKM Pasca Pandemi         | UMKM; strategi; pemulihan ekonomi | Artikel ini membahas strategi adaptif UMKM setelah pandemi... | link buka pdfnya | link ke artikelnya | DOI kalo ada     | Jurnal Ekonomi & Bisnis        |
| 2  | S3    | 2023-11-02     | Implementasi AI dalam Pendidikan Dasar       | AI; pendidikan; teknologi         | Penelitian ini mengeksplorasi penerapan AI pada kurikulum SD. | link buka pdfnya | link ke artikelnya | N/A kalau ga ada | Jurnal Teknologi Edukasi       |
| 3  | S4    | 2024-01-28     | Pengaruh Sosial Media terhadap Literasi Anak | sosial media; literasi; anak-anak | Studi ini menyoroti efek penggunaan media sosial pada anak... | link buka pdfnya | link ke artikelnya | Link DOI         | Jurnal Komunikasi & Media Baru |

> Catatan: Data diatas dummy ya, kalau data asli beneran takut kena semprot

Dari satu website jurnal OJS, kita bisa memilih untuk mengambil hanya satu *issue* terbaru (beserta seluruh artikelnya), atau mengambil semua *issue* yang sudah diterbitkan. Kalau kita memasukkan banyak URL jurnal sekaligus, jumlah data yang dihasilkan bisa mencapai ribuan artikel—atau bahkan lebih, tergantung skala jurnalnya. Lumayan lah ya.


### Penutup

Membangun *scraper* untuk jurnal OJS memang penuh tantangan karena tidak adanya standardisasi. Namun, dengan pendekatan yang terstruktur, fleksibel, dan etis, tugas ini sangat mungkin untuk diotomatisasi.

Skrip ini adalah hasil dari banyak iterasi dan penyempurnaan berdasarkan masalah nyata. Tidak ada solusi "satu untuk semua", tetapi semoga kerangka kerja ini bisa menjadi fondasi yang kuat untuk disesuaikan dengan kebutuhan riset Anda.

> Semoga bermanfaat!
