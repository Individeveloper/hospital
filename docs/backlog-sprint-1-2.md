# Backlog Eksekusi Sprint 1-2

## Tujuan
Menerjemahkan PRD menjadi backlog yang dapat langsung dieksekusi tim produk, backend, frontend, dan devops untuk fase awal implementasi SIMRS.

## Struktur Prioritas
- P0: Wajib selesai untuk baseline MVP operasional.
- P1: Penting, dikerjakan bila kapasitas sprint mencukupi.

## Sprint 1 (Fondasi Platform dan Data)

### Epic E1 - Platform Bootstrap dan DevOps Dasar
1. US-001 (P0): Sebagai developer, saya ingin monorepo NestJS + Next.js agar pengembangan backend/frontend terstruktur.
- Acceptance Criteria:
  - Workspace memiliki `apps/backend` dan `apps/frontend`.
  - Root workspace memiliki scripts install/build/dev.

2. US-002 (P0): Sebagai devops engineer, saya ingin baseline environment variables agar konfigurasi rahasia tidak di-hardcode.
- Acceptance Criteria:
  - Tersedia `.env.example` di root dan aplikasi.
  - Tidak ada secret nyata di repository.

3. US-003 (P1): Sebagai tim, saya ingin pipeline CI lint + test agar kualitas kode konsisten.
- Acceptance Criteria:
  - Pipeline menjalankan lint dan test minimal untuk backend/frontend.

### Epic E2 - Data Foundation dan RBAC Dasar
1. US-004 (P0): Sebagai backend engineer, saya ingin skema PostgreSQL awal agar data model inti siap dipakai.
- Acceptance Criteria:
  - Tabel inti tersedia: users, roles, permissions, patients, doctors, departments, schedules, appointments, medical_records, attachments, audit_logs.
  - Foreign key dan unique constraint utama terdefinisi.

2. US-005 (P0): Sebagai admin, saya ingin autentikasi role-based agar akses data dibatasi sesuai otoritas.
- Acceptance Criteria:
  - Role default: admin, petugas, dokter, auditor.
  - API endpoint terlindungi guard otorisasi role.

### Epic E3 - Master Data Admin
1. US-006 (P0): Sebagai petugas, saya ingin CRUD pasien agar data pendaftaran tercatat.
- Acceptance Criteria:
  - Create/read/update pasien aktif.
  - Validasi field wajib berjalan.

2. US-007 (P0): Sebagai admin, saya ingin CRUD dokter/departemen agar jadwal dapat disusun.
- Acceptance Criteria:
  - Create/read/update/delete dokter dan departemen berjalan.

## Sprint 2 (Booking, EMR Dasar, dan Audit)

### Epic E4 - Real-time Booking
1. US-008 (P0): Sebagai pasien, saya ingin melihat slot jadwal dokter agar bisa memilih waktu kunjungan.
- Acceptance Criteria:
  - API slot tersedia berdasarkan dokter dan tanggal.
  - Slot yang penuh tidak muncul sebagai tersedia.

2. US-009 (P0): Sebagai pasien, saya ingin membuat booking agar mendapat nomor antrean kunjungan.
- Acceptance Criteria:
  - Transaksi booking mencegah double booking slot.
  - Status awal booking adalah `booked`.

3. US-010 (P1): Sebagai petugas, saya ingin mengubah status booking agar alur check-in dan selesai tercatat.
- Acceptance Criteria:
  - Status transitions valid: booked -> checked-in -> completed.
  - Opsi canceled tersedia dengan alasan.

### Epic E5 - EMR Dasar dan Lampiran
1. US-011 (P0): Sebagai dokter, saya ingin menulis ringkasan catatan medis agar riwayat pasien terdokumentasi.
- Acceptance Criteria:
  - Catatan medis terkait appointment tersimpan.
  - Dokter hanya dapat menulis ke pasien yang ditangani.

2. US-012 (P1): Sebagai dokter, saya ingin upload lampiran agar dokumen penunjang tersimpan digital.
- Acceptance Criteria:
  - Metadata file tersimpan di database.
  - Link blob storage tercatat aman.

### Epic E6 - Audit Trail dan Monitoring Dasar
1. US-013 (P0): Sebagai auditor, saya ingin melihat log aktivitas agar perubahan data kritikal dapat ditelusuri.
- Acceptance Criteria:
  - Login, akses record medis, perubahan data pasien tercatat di `audit_logs`.
  - Tersedia filter by user, action, dan rentang waktu.

2. US-014 (P1): Sebagai admin, saya ingin dashboard KPI ringkas agar dapat memonitor trafik harian.
- Acceptance Criteria:
  - Menampilkan total booking harian dan rasio keberhasilan booking.

## Definition of Ready (DoR)
1. User story memiliki acceptance criteria yang terukur.
2. Ketergantungan antar story teridentifikasi.
3. Estimasi effort tersedia (story point/jam ideal).

## Definition of Done (DoD) per Story
1. Kode sudah direview.
2. Unit/integration test sesuai scope lulus.
3. Logging dasar ditambahkan untuk proses kritikal.
4. Dokumentasi API diperbarui.
