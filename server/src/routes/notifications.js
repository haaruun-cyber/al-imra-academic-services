import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const notificationsRouter = Router();

notificationsRouter.use(requireAuth);

notificationsRouter.get('/', asyncHandler(async (req, res) => {
  const [notifications, unread] = await Promise.all([
    prisma.notification.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' }, take: 25 }),
    prisma.notification.count({ where: { userId: req.user.id, isRead: false } })
  ]);
  res.json({ notifications, unread });
}));

notificationsRouter.patch('/:id/read', asyncHandler(async (req, res) => {
  const notification = await prisma.notification.update({
    where: { id: req.params.id },
    data: { isRead: true }
  });
  res.json({ notification });
}));
