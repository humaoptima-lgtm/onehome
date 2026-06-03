# One Home V10 — Backend Docker Stack

Folder ini berisi konfigurasi **Docker Compose** untuk menjalankan seluruh infrastruktur backend One Home. Arsitektur ini dirancang khusus untuk memenuhi kriteria sistem *Modular Monolith* dengan biaya infrastruktur yang serendah mungkin (cocok untuk VPS standar).

---

## 🏗️ Topologi Container

Sistem ini menjalankan 6 container (mesin) yang saling terhubung:

1. **`api` (NestJS)** — Port `3001`
   Core API untuk pendaftaran, transaksi, manajemen properti, dan logika bisnis.
2. **`smart-engine` (FastAPI / Python)** — Port `8000`
   Rule-Based Engine untuk komputasi algoritma berat dan rekomendasi.
3. **`postgres` (PostgreSQL 16)** — Port `5432`
   Database relasional utama.
4. **`redis` (Redis 7)** — Port `6379`
   In-memory cache, session storage, queue, dan event bus.
5. **`meilisearch` (Meilisearch)** — Port `7700`
   Mesin pencari *full-text search* super cepat (alternatif Algolia/Elasticsearch).
6. **`nginx` (Nginx Alpine)** — Port `80`
   Reverse proxy dan *gateway* yang merouting trafik dari luar ke `api` atau `smart-engine` berdasarkan subdomain.

---

## 💻 Cara Menjalankan (Local Development)

### 1. Persiapan Environment Variables
Pastikan Anda sudah menduplikasi file `.env` contoh menjadi file `.env` asli:
- Copy `.env.example` menjadi `.env`
- Copy `.env.api.example` menjadi `.env.api`
- Copy `.env.engine.example` menjadi `.env.engine`

### 2. Jalankan Docker Compose
Buka terminal di dalam folder `docker` ini, lalu jalankan perintah:

```bash
docker compose up -d --build
```
*Catatan: `--build` memaksa Docker untuk membuild ulang image NestJS & FastAPI jika ada perubahan kode sumber. Proses build pertama kali akan memakan waktu untuk mengunduh dependencies.*

### 3. Akses Layanan Lokal
Nginx telah dikonfigurasi untuk menangani *routing* berbasis subdomain. Pastikan Anda mengakses URL berikut melalui browser:

- **NestJS API:** [http://api.localhost](http://api.localhost)
- **FastAPI Smart Engine:** [http://ai.localhost](http://ai.localhost)
- **Smart Engine Swagger Docs:** [http://ai.localhost/docs](http://ai.localhost/docs)
- **Frontend (Next.js):** Dijalankan terpisah di luar Docker menggunakan `npm run dev` di root folder (biasanya di `http://localhost:3000`).

---

## 🚀 Cara Deployment (Production VPS / Hostinger)

Langkah deployment ke VPS Linux (Ubuntu/Debian) persis sama dengan eksekusi lokal:

1. **Persiapan VPS:** Pastikan VPS sudah ter-install Docker dan Docker Compose.
2. **Clone Repository:** Clone *source code* One Home ke dalam VPS.
3. **Setup `.env`:** Masuk ke folder `/docker` dan atur ulang file `.env` Anda. **Sangat Penting:** Ganti semua *default password* (Postgres, Redis, Master Key Meilisearch) di environment production!
4. **Jalankan:** `docker compose up -d --build`
5. **Domain Routing:** Arahkan DNS Record domain Anda (A Record) ke IP VPS tersebut:
   - `api.onehome.id` -> IP VPS (Untuk Nginx -> NestJS)
   - `ai.onehome.id` -> IP VPS (Untuk Nginx -> FastAPI)

*(Catatan: Konfigurasi SSL/HTTPS sebaiknya di-*handle* otomatis menggunakan fitur proksi SSL dari **Cloudflare** di depan VPS ini, sesuai dengan topologi V10).*

---

## 🛠️ Perintah Berguna (Cheat Sheet)

Melihat status container yang sedang berjalan:
```bash
docker compose ps
```

Melihat log secara *realtime* (semua container):
```bash
docker compose logs -f
```

Melihat log dari container tertentu saja (contoh: api):
```bash
docker compose logs -f api
```

Mematikan seluruh sistem tanpa menghapus data database/redis:
```bash
docker compose down
```

Mematikan sistem dan **MENGHAPUS SEMUA DATA** (Reset Total / Drop Volume):
```bash
docker compose down -v
```
