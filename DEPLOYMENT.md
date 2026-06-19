# Deployment Guide

## GitHub

```bash
git init
git add .
git commit -m "Initial AL-IMRA Academic Services release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/al-imra-academic-services.git
git push -u origin main
```

Do not commit `.env`. Use `.env.example` as the template for local setup.

## Render Single-Service Deploy

1. Push this repository to GitHub.
2. In Render, create a new Blueprint or Web Service from the repository.
3. Use:
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=<your Neon connection string>`
   - `JWT_SECRET=<long random secret>`
   - `CLIENT_URL=https://your-render-app.onrender.com`
   - `CLIENT_URLS=https://your-render-app.onrender.com`
   - `PUBLIC_APP_URL=https://your-render-app.onrender.com`
   - `DOCUMENT_STORAGE_DIR=/opt/render/project/src/server/storage/documents`
5. Run database setup from your machine after deploy variables are set:

```bash
npm run prisma:push
npm run prisma:seed
```

## Notes

- The Express server serves both `/api/*` and the built React app in production.
- Generated PDFs are stored on disk. For long-term production storage, attach persistent disk storage on Render or replace `DOCUMENT_STORAGE_DIR` with an object storage integration.
- Rotate any database password that was shared outside a secrets manager before public release.
