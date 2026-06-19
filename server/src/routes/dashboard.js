import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const dashboardRouter = Router();

dashboardRouter.use(requireAuth, allowRoles('SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER', 'FINANCE_USER'));

dashboardRouter.get('/', asyncHandler(async (req, res) => {
  const [students, total, pending, accepted, completed, recentRequests, logs, notifications] = await Promise.all([
    prisma.student.count(),
    prisma.certificateRequest.count(),
    prisma.certificateRequest.count({ where: { status: 'PENDING' } }),
    prisma.certificateRequest.count({ where: { status: 'ACCEPTED' } }),
    prisma.certificateRequest.count({ where: { status: 'COMPLETED' } }),
    prisma.certificateRequest.findMany({ take: 6, orderBy: { submittedAt: 'desc' }, include: { student: true } }),
    prisma.auditLog.findMany({ take: 8, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true } } } }),
    prisma.notification.findMany({ where: { userId: req.user.id }, take: 8, orderBy: { createdAt: 'desc' } })
  ]);

  res.json({
    stats: { students, total, pending, accepted, completed },
    recentRequests,
    logs,
    notifications
  });
}));
