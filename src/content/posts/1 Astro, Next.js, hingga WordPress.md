---
title: "Arsitektur Web: Dari Astro, Next.js, WordPress, hingga Blogger"
meta_title: "Opini pribadi dari Astro, Next.js, WordPress, hingga Blogger"
description: "Pandangan tentang berbagai pendekatan arsitektur web, dari Astro, Next.js, Hugo, hingga WordPress dan Blogger. Mana yang cocok untuk kebutuhan Anda?"
date: 2025-06-30
image: "../../assets/images/post1/cover1.webp"
authors: ["alditpra"]
categories: ["Web Development"]
tags: ["Astro", "Next.js", "Jamstack", "WordPress"]
---
Memilih fondasi teknologi untuk proyek web di tahun 2025 bukan lagi perkara sederhana. Saya pribadi sudah sering dihadapkan pada dilema memilih antara berbagai framework dan pendekatan arsitektur, dari yang sederhana seperti WordPress dan Blogger, hingga pendekatan modern seperti Astro dan Next.js.

Tulisan ini saya buat sebagai rangkuman pengalaman pribadi dan opini teknis saya. Bukan bermaksud memberi jawaban pasti, tapi semoga bisa memberi sudut pandang tambahan bagi Anda yang sedang mempertimbangkan teknologi web.

By the way, ini adalah post pertama sejak situs ini dibuat. Selagi masih fresh tentang apa yang ada dipikiran dalam menentukan arsitektur untuk website ini.

---

## Bagian 1: Konteks & Konsep Kunci

### 1.1 Dari Monolitik ke Jamstack — Kenapa Saya Beralih

Dulu saya banyak membangun situs pakai WordPress dan Blogger. Praktis dan cepat, tapi makin lama makin terasa berat, terutama ketika trafik mulai naik dan klien mulai komplain soal kecepatan. Blogger bahkan lebih terbatas lagi dari sisi kontrol dan fleksibilitas. Setelah mengenal pendekatan Jamstack, saya mulai menyukai filosofi "build sekali, sebar ke CDN" — artinya, situs dibangun saat deploy dan didistribusikan secara global melalui jaringan CDN. Hasilnya? Situs lebih ringan dan nyaris bebas dari bottleneck backend.

### 1.2 Core Web Vitals: Bukan Cuma SEO, Tapi Nyata Pengaruhnya

Banyak yang mengira CWV itu cuma buat nyenengin Google. Tapi laporan dari [Web Almanac 2024](https://almanac.httparchive.org/en/2024/performance) dan [web.dev](https://web.dev/vitals/) membuktikan bahwa situs dengan skor CWV baik cenderung memiliki bounce rate yang lebih rendah dan waktu interaksi yang lebih baik. Jadi ya, CWV itu nyata dampaknya.

| Metrik | Apa yang Diukur?              | Skor "Baik" |
| ------ | ----------------------------- | ----------- |
| LCP    | Kecepatan elemen utama muncul | < 2.5 detik |
| INP    | Respons interaksi pengguna    | < 200 md    |
| CLS    | Stabilitas visual             | < 0.1       |

---

## Bagian 2: Platform yang Pernah Saya Gunakan — Plus Minusnya

Berikut ini pengalaman dan kesan saya terhadap beberapa platform populer:

### 2.1 Astro — Favorit Saya untuk Konten

* **Kenapa suka**: Zero-JS by default, super cepat. Ideal buat landing page atau blog statis.
* **Arsitektur**: Islands Architecture
* **Cocok untuk**: Situs dengan interaksi minim, tapi butuh performa maksimal

### 2.2 Blogger — Sangat Terbatas Tapi Cepat untuk Mulai

* **Kelebihan**: Gratis, hosting dari Google, mudah dipakai untuk pemula
* **Kelemahan**: Hampir tidak bisa dikustomisasi secara mendalam, tampilannya stagnan
* **Ideal untuk**: Blog pribadi sederhana atau percobaan awal dunia blogging
* **Catatan**: Kalau serius di konten, Blogger cepat terasa membatasi

### 2.3 CodeIgniter — Proyek Kecil atau Pembelajaran

* **Sisi minus**: Tidak cocok untuk sistem besar yang butuh modularitas tinggi
* **Catatan**: Banyak developer yang merasa CodeIgniter tetap relevan untuk prototipe ringan

### 2.4 Ghost — Sederhana Tapi Powerful untuk Menulis

* **Kesan saya**: Pengalaman menulis terbaik dibanding CMS lain
* **Sisi minus**: Butuh web hosting dengan SSH, VPS, atau versi Pro
* **Fitur unggulan**: API-first, cocok juga dijadikan headless

### 2.5 Hugo — Kencang Banget Tapi Kurang Fleksibel

* **Kelebihan**: Build ribuan halaman dalam detik
* **Sisi minus**: Templating-nya agak "gak familiar(GO)"
* **Ideal untuk**: Dokumentasi teknis atau produk besar

### 2.6 Laravel — Banyak Yang Suka, Enterprise Grade

* **Tantangan**: Learning curve-nya lumayan
* **Kelebihan**: Dokumentasi top, syntax elegan
* **Ideal untuk**: Aplikasi web kompleks dengan banyak fitur dan integrasi
* **Catatan pribadi**: Walaupun lengkap dan punya ekosistem luas, Laravel terasa terlalu "berat" untuk sebagian besar proyek saya yang kecil-kecilan

### 2.7 Next.js — Solusi All-in-One Tapi Butuh Tenaga Ekstra

* **Pengalaman**: Powerful banget, tapi butuh disiplin tinggi dalam struktur dan performa
* **Fitur utama**: React Server Components, SSR + SSG + ISR
* **Cocok untuk**: Aplikasi web kompleks dengan banyak jenis konten

### 2.8 WordPress — Populer dan Masih Relevan, Tapi Banyak PR

* **Pengalaman**: Proyek untuk klien dimana mayoritas non-teknis
* **Kelemahan**: Tergantung pada hosting, plugin, atau konfigurasi server
* **Kelebihan**: Tim konten bisa mandiri
* **Tantangan**: Pengaturan keamanan, kecepatan, dan SEO bisa rumit

---

## Bagian 3: Perbandingan dari Kacamata Pribadi

### 3.1 Performa & CWV

| Platform    | Output  | CWV          | Catatan                                          |
| ----------- | ------- | ------------ | ------------------------------------------------ |
| Astro       | Statis  | ✅✅✅       | Paling cepat sejauh ini                          |
| Blogger     | Dinamis | ✅⚠️⚠️   | Stabil, tapi kustomisasi terbatas                |
| CodeIgniter | Dinamis | ✅⚠️⚠️   | Performa default kurang optimal                  |
| Ghost       | Hibrida | ✅✅⚠️     | CWV cukup baik dengan konfigurasi ringan         |
| Hugo        | Statis  | ✅✅✅       | Build time tercepat                              |
| Laravel     | Dinamis | ✅⚠️⚠️   | Perlu caching dan tuning manual                  |
| Next.js     | Hibrida | ✅✅⚠️     | Bisa optimal, asal setting tepat                 |
| WordPress   | Dinamis | ⚠️⚠️⚠️ | Sangat tergantung plugin & server-side rendering |

> Disclaimer: Skor CWV di atas adalah indikasi umum, bukan hasil benchmark resmi. Kalau bicara optimasi ya semua bisa di optimasi.

### 3.2 Pengalaman Developer (DX)

| Platform    | Belajar      | Nyaman Dipakai | Catatan                                  |
| ----------- | ------------ | -------------- | ---------------------------------------- |
| Astro       | Mudah        | Sangat nyaman  | Seperti HTML + komponen                  |
| Blogger     | Sangat mudah | Sederhana      | Hampir tanpa kontrol teknis              |
| CodeIgniter | Mudah        | Terasa usang   | Kurang dukungan modern                   |
| Ghost       | Mudah        | Sangat fokus   | UX editor sangat nyaman                  |
| Hugo        | Curam        | Agak kaku      | Butuh waktu adaptasi                     |
| Laravel     | Menengah     | Elegan         | Tapi terlalu kompleks buat saya          |
| Next.js     | Menengah     | Powerful       | Tapi kompleks                            |
| WordPress   | Sangat mudah | Banyak plugin  | Suka khawatir plugin konflik saat update |

### 3.3 Biaya Total

| Platform    | Arsitektur | Biaya Hosting                                  |
| ----------- | ---------- | ---------------------------------------------- |
| Astro       | SSG        | Hampir nol (bisa pakai Netlify/Vercel gratis)  |
| Blogger     | Dinamis    | Gratis, hosting dari Google                    |
| CodeIgniter | Dinamis    | Cukup ringan                                   |
| Ghost       | Hibrida    | Sedang - tinggi                                |
| Hugo        | SSG        | Hampir nol (bisa pakai Netlify/Vercel gratis)  |
| Laravel     | Dinamis    | Butuh server yang proper                       |
| Next.js     | Hibrida    | Menyesuaikan (bisa gratis, bisa tinggi)        |
| WordPress   | Dinamis    | Bisa murah (shared), bisa mahal (high-traffic) |

---

## Bagian 4: Headless CMS 

Kalau ditanya solusi paling fleksibel, saya akan jawab: **Headless CMS + Frontend Modern**. Misalnya:

* `Astro + Contentful`
* `Next.js + Strapi`
* `Laravel + Sanity`

Dengan pendekatan ini, tim konten tetap bisa kerja nyaman, sementara frontend tetap super cepat dan modular.

> Catatan: Headless CMS ideal bila tim Anda terdiri dari developer dan editor konten terpisah. Untuk proyek kecil, kadang justru terlalu kompleks.

---

## Bagian 5: Rekomendasi Pribadi

| Kebutuhan                    | Saya Sarankan                                                          |
| ---------------------------- | ---------------------------------------------------------------------- |
| Blog pribadi                 | **Astro**, **Hugo**, atau **Blogger** (untuk pemula) |
| Web App kompleks             | **Next.js** atau **Laravel** (kalau tim besar)             |
| Klien non-teknis (mayoritas) | **WordPress (Managed Hosting)** atau **Ghost**             |

---

### Penutup

Tidak ada satu tools yang cocok untuk semua. Saya pribadi suka bereksperimen dan menyesuaikan teknologi dengan kebutuhan proyek. Mudah-mudahan opini dan pengalaman saya ini bisa memberi gambaran yang lebih nyata dibanding sekadar dokumentasi teknis biasa.

> Semoga bermanfaat!
