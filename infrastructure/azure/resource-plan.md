# Azure Resource Plan (Student Budget)

## Resource Group
- Name: `rg-simrs-dev`
- Region: `Southeast Asia` (sesuaikan lokasi terdekat)

## Core Services
1. App Service Plan (Linux, B1 minimum)
2. Azure App Service untuk backend NestJS
3. Azure Static Web Apps untuk frontend Next.js
4. Azure Database for PostgreSQL Flexible Server
5. Azure Storage Account + Blob container `medical-documents`
6. Azure Key Vault untuk secret aplikasi
7. Application Insights + Log Analytics

## Security Baseline
1. Aktifkan HTTPS only pada App Service.
2. Simpan connection string di Key Vault.
3. Gunakan managed identity untuk akses Key Vault/Storage.
4. Batasi network access database sesuai kebutuhan.

## Backup dan Recovery
1. Aktifkan automated backup PostgreSQL.
2. Verifikasi Point-in-Time Restore (PITR) minimal 1 kali per sprint besar.
3. Simpan SOP recovery dan hasil drill di dokumentasi operasional.
