import path from 'node:path';
import { Router } from 'express';
import { prisma } from '../db.js';
import { config } from '../config.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { audit } from '../utils/audit.js';

export const documentsRouter = Router();

documentsRouter.get('/file/:fileName', asyncHandler(async (req, res) => {
  const storageDir = path.resolve(config.documentStorageDir);
  const fullPath = path.resolve(storageDir, req.params.fileName);
  if (!fullPath.startsWith(`${storageDir}${path.sep}`)) {
    return res.status(400).json({ message: 'Invalid file name' });
  }
  res.sendFile(fullPath);
}));

documentsRouter.use(requireAuth, allowRoles('SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER', 'FINANCE_USER'));

documentsRouter.get('/', asyncHandler(async (req, res) => {
  const { search = '' } = req.query;
  const documents = await prisma.document.findMany({
    where: {
      OR: [
        { fileName: { contains: search, mode: 'insensitive' } },
        { request: { requestNo: { contains: search, mode: 'insensitive' } } },
        { request: { student: { studentName: { contains: search, mode: 'insensitive' } } } }
      ]
    },
    include: { request: { include: { student: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json({ documents });
}));

documentsRouter.delete('/:id', asyncHandler(async (req, res) => {
  await prisma.document.delete({ where: { id: req.params.id } });
  await audit(req.user.id, 'DELETE_DOCUMENT', `Deleted document ${req.params.id}`);
  res.status(204).send();
}));
