# SIMRS Azure Monorepo

Monorepo awal untuk Sistem Informasi Manajemen Rumah Sakit (SIMRS) berbasis:
- Backend: NestJS
- Frontend: Next.js
- Database: PostgreSQL (Azure Flexible Server target)

## Struktur
- `apps/backend`: API NestJS
- `apps/frontend`: Dashboard/portal Next.js
- `database/schema.sql`: skema awal PostgreSQL
- `docs/backlog-sprint-1-2.md`: backlog delivery sprint 1-2
- `infrastructure/azure/resource-plan.md`: blueprint resource Azure

## Prasyarat
1. Node.js 20+
2. npm 10+
3. PostgreSQL 15+ (lokal atau Azure)

## Setup
1. Install dependencies
   - `npm install`
2. Copy environment file
   - salin `.env.example` sesuai kebutuhan
3. Jalankan backend
   - `npm run dev:backend`
4. Jalankan frontend
   - `npm run dev:frontend`

## Endpoint Baseline
1. Health check backend: `GET /api/v1/health`
2. Placeholder API:
   - `/api/v1/users`
   - `/api/v1/patients`
   - `/api/v1/doctors`
   - `/api/v1/schedules`
   - `/api/v1/appointments`
   - `/api/v1/emr`
   - `/api/v1/audit-logs`

## Catatan
Scaffold ini adalah baseline sprint awal. Implementasi bisnis, database integration layer, authentication Entra ID, dan integrasi Azure service akan ditambahkan bertahap sesuai backlog.
