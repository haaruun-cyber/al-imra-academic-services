# AL-IMRA Academic Services

Production-ready academic certificate request and management system built with React, Vite, Tailwind CSS, Express, Prisma, PostgreSQL, JWT authentication, RBAC, reporting, notifications, document archive, and PDF generation.

## Features

- Public university-style website with certificate request form.
- JWT login with Super Admin, Admin, Registrar, Finance, and Student roles.
- Dashboard statistics, request workflow, notifications, audit logs, reports, users, and document archive.
- Professional PDF generation with signatures, stamp area, and QR verification.
- Prisma/PostgreSQL backend ready for Neon.
- Single-service production deploy: Express serves the API and built React app.

## Local Setup

```bash
npm install
copy .env.example .env
npm run prisma:push
npm run prisma:seed
npm run dev
```

On macOS/Linux, use `cp .env.example .env`.

Default super admin:

- Email: `superadmin@alimra.edu`
- Password: `Admin@12345`

Local URLs:

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000/api/health`

## Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for GitHub and Render deployment steps.

Required environment variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `CLIENT_URL`
- `CLIENT_URLS`
- `PUBLIC_APP_URL`
- `DOCUMENT_STORAGE_DIR`
