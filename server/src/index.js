import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { authRouter } from './routes/auth.js';
import { usersRouter } from './routes/users.js';
import { requestsRouter } from './routes/requests.js';
import { dashboardRouter } from './routes/dashboard.js';
import { notificationsRouter } from './routes/notifications.js';
import { documentsRouter } from './routes/documents.js';
import { reportsRouter } from './routes/reports.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');
const distDir = path.join(projectRoot, 'dist');

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || config.clientUrls.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(config.isProduction ? 'combined' : 'dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

app.get('/api/health', (_req, res) => res.json({ ok: true, name: 'AL-IMRA Academic Services API' }));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/reports', reportsRouter);

if (config.isProduction) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error', detail: process.env.NODE_ENV === 'production' ? undefined : err.message });
});

app.listen(config.port, () => {
  console.log(`AL-IMRA API running on http://localhost:${config.port}`);
});
