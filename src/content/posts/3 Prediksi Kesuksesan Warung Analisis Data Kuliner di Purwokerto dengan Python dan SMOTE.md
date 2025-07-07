---
title: "Memprediksi Kesuksesan Usaha Kuliner dengan Data dan SMOTE"
meta_title: "Prediksi Usaha Kuliner: Tutorial Data Publik, TF-IDF, dan SMOTE"
description: "Tutorial membangun model machine learning untuk memprediksi kesuksesan usaha kuliner menggunakan data Google Maps, TF-IDF, dan SMOTE."
pubDate: 2025-07-07
authors: ["alditpra"]
image: "../../assets/images/post3/cover.webp"
categories: ["Data & Analisis"]
tags: ["machine learning", "kuliner", "smote", "random forest", "tf-idf", "tutorial", "python"]

---

Apa yang membuat sebuah usaha kuliner berhasil? Lokasi? Rasa? Nama usaha? Pertanyaan seperti ini mendorong saya untuk mencoba menjawabnya menggunakan pendekatan data dan machine learning.

Saya menggunakan data dari Google Maps yang mencakup lebih dari 2.000 usaha kuliner di Purwokerto. Setiap entri mencakup nama, rating, jumlah ulasan, kategori, serta keberadaan website dan nomor telepon. Tujuannya: membangun model untuk memprediksi apakah sebuah usaha termasuk "sukses" atau tidak.

## 1. Mendefinisikan Sukses dan Menghadapi Tantangan Data

### 1.1 Definisi Sukses

Agar bisa dianalisis secara supervised learning, saya definisikan usaha "sukses" sebagai yang memiliki rating **>= median (4.6)** dan jumlah ulasan **>= median (15)**.

```python
df['Is_Successful'] = ((df['Rating'] >= 4.6) & (df['Review Count'] >= 15)).astype(int)
```

Hasilnya mengejutkan: hanya 23% usaha tergolong sukses. Ini menciptakan masalah klasik dalam machine learning: **data tidak seimbang (imbalanced)**.

### 1.2 Solusi dengan SMOTE

```python
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline
```

Untuk mengatasi ketidakseimbangan, saya menggunakan **SMOTE** yang membuat sampel sintetis dari kelas minoritas. Teknik ini memungkinkan model lebih adil dalam mempelajari pola usaha sukses. Apakah ini selalu solusi terbaik? Tidak selalu. Tapi dalam kasus ini, SMOTE memberikan hasil yang cukup signifikan.

## 2. Membangun Pipeline Preprocessing

### 2.1 Strategi Multi-Fitur

Saya menggabungkan tiga tipe fitur yang berbeda:

* **Numerik**: keberadaan website (`has_website`) dan nomor telepon (`has_phone`)
* **Kategorikal**: kategori usaha (`Category`)
* **Tekstual**: nama usaha (`Name`) diproses dengan TF-IDF

### 2.2 Implementasi Pipeline

```python
text_transformer = TfidfVectorizer(max_features=50, stop_words=['di','dan','rm','cabang'])
categorical_transformer = OneHotEncoder(handle_unknown='ignore')
```

Semua fitur digabung dalam `ColumnTransformer`, lalu masuk ke pipeline yang mencakup SMOTE dan Random Forest. Pipeline ini memastikan preprocessing konsisten antara data training dan testing.

## 3. Model Training dan Optimasi

Saya menggunakan `RandomForestClassifier` sebagai model utama, dituning menggunakan `RandomizedSearchCV` dengan 5-fold cross-validation.

```python
{'n_estimators': 200,
 'min_samples_split': 2,
 'min_samples_leaf': 2,
 'max_features': 'sqrt',
 'max_depth': 30}
```

Apakah semua kombinasi dicoba? Tidak. Tapi dengan 50 iterasi, cukup banyak ruang untuk eksplorasi tanpa menghabiskan waktu terlalu lama.

## 4. Evaluasi dan Interpretasi Hasil

### 4.1 Performa Model

Model diuji pada 20% data (427 baris) dengan hasil yang cukup menarik:

* **Akurasi**: 73%
* **F1-macro**: 63%
* **AUC**: 0.687

```text
Tidak Sukses: precision=0.83 | recall=0.81
Sukses      : precision=0.43 | recall=0.46
```

Masih ada gap antara recall kelas minoritas dan mayoritas. Tapi dibanding tanpa SMOTE, perbaikan ini terasa. Apakah sudah cukup untuk keputusan bisnis? Belum tentu.

### 4.2 Faktor Penentu Kesuksesan

Berikut fitur paling penting menurut Random Forest:

```
1. has_website (0.075)
2. angkringan (dari TF-IDF Name)
3. has_phone (0.055)
4. pak (TF-IDF Name)
5. es (TF-IDF Name)
6. ayam, nasi, soto, sate (TF-IDF Name)
7. Category_Restaurant, Coffee shop, Cafe
```

Kata-kata yang muncul dalam nama usaha seperti "angkringan", "ayam", atau "pak" punya bobot prediktif tinggi. Apakah ini cerminan dari positioning usaha? Sangat mungkin.

## 5. Kesimpulan dan Refleksi

Eksperimen ini memberi beberapa pelajaran penting:

* Nama usaha bukan sekadar estetika, tapi punya sinyal branding yang kuat
* Informasi sederhana seperti "punya website" cukup berpengaruh pada prediksi kesuksesan
* SMOTE terbukti membantu menangani bias terhadap kelas mayoritas

Apakah model ini sudah cukup andal untuk keputusan bisnis? Belum. Tapi cukup untuk menjadi alat bantu awal dalam memahami pola kesuksesan usaha kuliner.

Saya jadi penasaran, bagaimana jika kita punya data lokasi, harga menu, atau foto makanan? Mungkin prediksi bisa jauh lebih akurat. Untuk sekarang, setidaknya kita bisa membaca sinyal-sinyalnya lebih baik, dan itu awal yang menjanjikan.