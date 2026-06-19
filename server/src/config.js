import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  clientUrls: (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),
  jwtSecret: process.env.JWT_SECRET || 'development-secret-change-me',
  publicAppUrl: process.env.PUBLIC_APP_URL || process.env.CLIENT_URL || 'http://localhost:5173',
  documentStorageDir: process.env.DOCUMENT_STORAGE_DIR || 'server/storage/documents',
  isProduction: process.env.NODE_ENV === 'production'
};
