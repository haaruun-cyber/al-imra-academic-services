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

## Backend Deploy on Render

1. Push this repository to GitHub.
2. In Render, create a new Web Service from the repository root.
3. Use:
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=<your Neon connection string>`
   - `JWT_SECRET=<long random secret>`
   - `CLIENT_URL=https://your-frontend-domain`
   - `CLIENT_URLS=https://your-frontend-domain`
   - `PUBLIC_APP_URL=https://your-frontend-domain`
   - `DOCUMENT_STORAGE_DIR=/opt/render/project/src/server/storage/documents`
5. Run database setup from your machine after deploy variables are set:

```bash
npm run prisma:push
npm run prisma:seed
```

6. Check the deployed backend health endpoint:

```bash
https://your-backend-domain/api/health
```

## Frontend API URL

If the frontend is deployed separately, set this environment variable in the frontend hosting provider and redeploy the frontend:

```bash
VITE_API_URL=https://your-backend-domain/api
```

## Notes

- The Express server serves both `/api/*` and the built React app in production when deployed as one Render service.
- For separate frontend/backend deploys, the frontend must use `VITE_API_URL` with the backend URL, and the backend must allow the frontend domain in `CLIENT_URLS`.
- Generated PDFs are stored on disk. For long-term production storage, attach persistent disk storage on Render or replace `DOCUMENT_STORAGE_DIR` with an object storage integration.
- Rotate any database password that was shared outside a secrets manager before public release.
