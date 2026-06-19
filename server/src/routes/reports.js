import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const reportsRouter = Router();

reportsRouter.use(requireAuth, allowRoles('SUPER_ADMIN', 'ADMIN'));

reportsRouter.get('/', asyncHandler(async (_req, res) => {
  const [statusRows, facultyRows, departmentRows, requests] = await Promise.all([
    prisma.certificateRequest.groupBy({ by: ['status'], _count: true }),
    prisma.student.groupBy({ by: ['faculty'], _count: true }),
    prisma.student.groupBy({ by: ['department'], _count: true }),
    prisma.certificateRequest.findMany({ select: { submittedAt: true, status: true } })
  ]);

  const monthMap = new Map();
  const yearMap = new Map();
  for (const request of requests) {
    const month = request.submittedAt.toISOString().slice(0, 7);
    const year = request.submittedAt.getFullYear().toString();
    monthMap.set(month, (monthMap.get(month) || 0) + 1);
    yearMap.set(year, (yearMap.get(year) || 0) + 1);
  }

  res.json({
    statuses: statusRows.map((item) => ({ name: item.status, value: item._count })),
    faculties: facultyRows.map((item) => ({ name: item.faculty, value: item._count })),
    departments: departmentRows.map((item) => ({ name: item.department, value: item._count })),
    monthly: [...monthMap.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => a.name.localeCompare(b.name)),
    yearly: [...yearMap.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => a.name.localeCompare(b.name))
  });
}));
