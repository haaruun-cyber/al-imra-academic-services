import dotenv from 'dotenv';

dotenv.config();

// On Vercel (serverless), the only writable directory is /tmp.
// For local development, use the server/storage/documents directory.
const isVercel = !!process.env.VERCEL;
const defaultStorageDir = isVercel ? '/tmp/al-imra-documents' : 'server/storage/documents';
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
const clientUrls = [
  process.env.CLIENT_URLS,
  process.env.CLIENT_URL,
  'http://localhost:5173',
  vercelUrl
]
  .filter(Boolean)
  .join(',')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

export const config = {
  port: process.env.PORT || 4000,
  clientUrls,
  jwtSecret: process.env.JWT_SECRET || 'development-secret-change-me',
  publicAppUrl: process.env.PUBLIC_APP_URL || process.env.CLIENT_URL || 'http://localhost:5173',
  documentStorageDir: process.env.DOCUMENT_STORAGE_DIR || defaultStorageDir,
  isProduction: process.env.NODE_ENV === 'production'
};
