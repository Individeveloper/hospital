# Product Requirements Document (PRD)
## Sistem Informasi Manajemen Rumah Sakit (SIMRS) Digital - Azure Optimized

- Versi: 1.3 (Refined)
- Status: Draft Siap Implementasi
- Tanggal: 29 Maret 2026
- Target Environment: Microsoft Azure for Students

---

## 1. Ringkasan Eksekutif
Proyek SIMRS Digital bertujuan mendigitalisasi proses operasional rumah sakit secara end-to-end, dengan fokus utama pada:

1. Integritas data medis dan administratif (target operasional: zero data loss pada skenario yang tercakup backup/restore).
2. Layanan booking dokter spesialis real-time untuk meningkatkan pengalaman pasien.
3. Kendali akses dan auditability yang kuat untuk memenuhi prinsip keamanan data kesehatan.

Sistem dirancang cloud-native di Azure agar dapat diskalakan, aman, dan efisien untuk konteks akademik/PoC melalui Azure for Students.

---

## 2. Tujuan Produk dan KPI

### 2.1 Tujuan Bisnis
1. Mengurangi waktu pendaftaran dan booking pasien.
2. Mengurangi kesalahan input manual data pasien.
3. Meningkatkan visibilitas operasional melalui dashboard admin.

### 2.2 KPI Utama
1. Keberhasilan booking: >= 99% request booking tersimpan tanpa konflik.
2. Ketersediaan layanan: >= 99.5% selama jam operasional (MVP target).
3. Waktu respons API: p95 < 500 ms untuk endpoint kritikal (booking, login, cari jadwal).
4. Recovery Objective:
   - RPO target: <= 5 menit (mengandalkan backup + PITR sesuai tier).
   - RTO target: <= 30 menit untuk prosedur restore terstandar.
5. Akurasi data pasien: duplikasi data turun >= 60% setelah implementasi merge workflow.

---

## 3. Ruang Lingkup

### 3.1 In Scope (MVP)
1. Dashboard admin/pengelola (master data pasien, dokter, jadwal).
2. Role-Based Access Control (admin, petugas, dokter, auditor).
3. Modul EMR dasar (riwayat kunjungan, diagnosis ringkas, resep ringkas).
4. Booking dokter spesialis real-time dengan manajemen slot.
5. Audit trail aktivitas pengguna.
6. Notifikasi otomatis pengingat jadwal (via Azure Functions ke WhatsApp API).
7. Data backup/restore operasional menggunakan PostgreSQL Flexible Server.

### 3.2 Out of Scope (Fase Lanjutan)
1. Integrasi BPJS/insurance gateway tingkat produksi.
2. Integrasi IoT alat medis.
3. AI clinical decision support.
4. Mobile app native (Android/iOS).

---

## 4. Pengguna dan Peran

1. Admin Sistem:
   - Kelola user, role, konfigurasi global.
   - Akses data recovery tools dan audit trail.
2. Petugas Pendaftaran:
   - Registrasi pasien, verifikasi data, pengelolaan antrean.
3. Dokter:
   - Lihat jadwal, akses EMR pasien sesuai izin, update catatan medis.
4. Manajemen/Auditor:
   - Akses laporan kinerja dan log aktivitas read-only.
5. Pasien (via portal frontend):
   - Booking jadwal dan melihat status booking.

---

## 5. Arsitektur Teknologi Azure

### 5.1 Komponen Utama
1. Backend API: NestJS di Azure App Service.
2. Frontend Dashboard/Portal: Next.js di Azure Static Web Apps.
3. Database: Azure Database for PostgreSQL Flexible Server.
4. File Storage: Azure Blob Storage (arsip dokumen medis/lab).
5. Secret Management: Azure Key Vault.
6. Identity: Microsoft Entra ID (OAuth2/OpenID Connect).
7. Event/Automation: Azure Functions untuk notifikasi dan job terjadwal.
8. Monitoring: Azure Monitor + Application Insights + Log Analytics.

### 5.2 Prinsip Arsitektur
1. Stateless backend (session/token disimpan aman, bukan di memory instance).
2. Separation of concerns: API, frontend, worker/notifier terpisah.
3. Least privilege access ke seluruh resource Azure.
4. Infrastructure as Code (disarankan Bicep/Terraform pada fase stabil).

---

## 6. Functional Requirements

### 6.1 Dashboard Admin & Pengelola
- [F-01] Management Center:
  1. CRUD pasien, dokter, poli, dan jadwal praktik.
  2. Validasi mandatory field pada pendaftaran.

- [F-02] Data Recovery Tools:
  1. Menampilkan histori backup/restore event.
  2. Menjalankan prosedur restore terkontrol (berbasis SOP).

- [F-03] RBAC (Role-Based Access Control):
  1. Mapping role ke permission granular (read/create/update/delete/export).
  2. Integrasi auth dengan Microsoft Entra ID.

- [F-04] Audit Trails:
  1. Catat login, akses record medis, perubahan data kritikal.
  2. Fitur pencarian log by user, waktu, tindakan, dan resource.

### 6.2 Modul Digitalisasi & Booking
- [F-05] Electronic Medical Record (EMR):
  1. Riwayat kunjungan pasien tersimpan terpusat.
  2. Lampiran dokumen medis tersimpan di Blob Storage dengan referensi metadata di PostgreSQL.

- [F-06] Real-time Booking:
  1. Pasien memilih dokter, tanggal, slot tersedia.
  2. Sistem mencegah double booking pada slot yang sama.
  3. Status booking: booked, checked-in, completed, canceled.

- [F-07] Automated Notifications:
  1. Trigger reminder H-1 dan H-0.
  2. Retry policy untuk pengiriman gagal.

---

## 7. Non-Functional Requirements

1. Zero Data Loss Strategy:
   - Automated backups aktif.
   - Point-in-time restore tervalidasi berkala.
   - Geo-redundant backup bila didukung tier dan anggaran.
2. Security Compliance:
   - TLS in-transit.
   - Encryption at-rest default Azure.
   - Secret hanya di Key Vault (tanpa hardcode).
3. Performance:
   - p95 API kritikal < 500 ms.
4. Scalability:
   - Auto-scale App Service berdasarkan CPU/memory/request.
5. Reliability:
   - Health checks endpoint dan alerting aktif.
6. Observability:
   - Correlation ID per request lintas service.

---

## 8. Data Model Tingkat Tinggi

Entitas inti (MVP):
1. users
2. roles
3. permissions
4. patients
5. doctors
6. departments
7. schedules
8. appointments
9. medical_records
10. attachments
11. audit_logs

Catatan desain:
1. Gunakan UUID sebagai primary key.
2. Soft delete untuk entitas bisnis utama.
3. Timestamp standar: created_at, updated_at, deleted_at.

---

## 9. Alur Kerja Admin (To-Be)

1. Login:
   - Admin login menggunakan akun organisasi via Entra ID.
2. Monitor:
   - Dashboard menampilkan trafik pasien harian, rasio booking berhasil, dan antrean aktif.
3. Pengolahan Data:
   - Admin validasi pendaftaran.
   - Jika duplikat terdeteksi, admin merge data lewat workflow terkontrol dan tercatat di audit log.
4. Reporting:
   - Admin generate laporan bulanan dari PostgreSQL (opsi ekspor CSV/PDF pada fase lanjut).

---

## 10. Acceptance Criteria per Fitur Kritis

1. Booking:
   - Jika dua user memesan slot sama, hanya satu transaksi yang berhasil.
   - Waktu konfirmasi booking <= 3 detik pada beban normal.
2. EMR Access Control:
   - User tanpa izin tidak dapat membaca data medis (HTTP 403).
3. Audit Trail:
   - Perubahan data pasien harus menghasilkan entri log lengkap (user, action, timestamp, before/after ringkas).
4. Recovery Drill:
   - Simulasi restore berhasil sesuai target RTO/RPO yang ditentukan.

---

## 11. Security Baseline

1. Enforce MFA pada akun admin.
2. Gunakan managed identity untuk akses antar layanan Azure bila memungkinkan.
3. Nonaktifkan public access resource yang tidak perlu.
4. Terapkan principle of least privilege pada role dan service principal.
5. Jadwalkan vulnerability scan dependency backend/frontend.

---

## 12. DevOps dan Deployment

1. Branching strategy: trunk-based sederhana (main + short-lived feature branch).
2. CI/CD (GitHub Actions atau Azure DevOps):
   - Build dan test backend/frontend.
   - Security checks dasar.
   - Deploy otomatis ke environment dev.
3. Environment:
   - dev, staging, production (minimal dev + staging untuk fase awal).
4. Konfigurasi runtime via App Settings + Key Vault references.

---

## 13. Roadmap Implementasi (8 Minggu)

1. Minggu 1-2:
   - Setup Resource Group, PostgreSQL Flexible Server, Blob Storage, Key Vault.
   - Bootstrap project NestJS + Next.js.
2. Minggu 3-5:
   - Implement API master data + auth RBAC.
   - Implement dashboard admin inti.
3. Minggu 6-7:
   - Implement booking real-time + notifikasi Azure Functions.
   - Integrasi upload dokumen medis ke Blob Storage.
4. Minggu 8:
   - Hardening keamanan, load test dasar, recovery drill, UAT.

---

## 14. Risiko dan Mitigasi

1. Risiko: Biaya cloud melebihi kuota Azure for Students.
   - Mitigasi: gunakan tier hemat, auto-shutdown non-prod, monitoring budget alert.
2. Risiko: Konflik booking saat trafik tinggi.
   - Mitigasi: transaksi database + unique constraint slot + retry terukur.
3. Risiko: Kebocoran kredensial.
   - Mitigasi: Key Vault, rotasi secret berkala, tanpa secret di source code.
4. Risiko: Keterlambatan integrasi notifikasi eksternal.
   - Mitigasi: fallback queue/retry dan provider abstraction.

---

## 15. Definisi Selesai (Definition of Done)

Fitur dianggap selesai jika:
1. Acceptance criteria terpenuhi.
2. Unit test dan integration test minimum berjalan sukses.
3. Logging, monitoring, dan alert dasar aktif.
4. Dokumen API dan SOP operasional diperbarui.
5. Tidak ada blocker severity tinggi di security checklist.

---

## 16. Lampiran Teknis (Rekomendasi Awal)

1. Backend framework modules (NestJS): auth, users, patients, doctors, schedules, appointments, emr, audit.
2. ORM: Prisma atau TypeORM (pilih satu dan konsisten).
3. Frontend dashboard: role-aware route protection + server-side rendering untuk halaman sensitif.
4. API style: REST JSON dengan versioning `/api/v1`.

---

Dokumen ini dapat dijadikan baseline sprint planning, pembuatan backlog (epic/user story), dan desain detail (HLD/LLD).
