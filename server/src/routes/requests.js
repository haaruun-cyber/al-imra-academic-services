import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { requestSchema, statusSchema } from '../validators.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { audit } from '../utils/audit.js';
import { createCertificatePdf } from '../services/pdfService.js';

export const requestsRouter = Router();

async function notifyNewRequest(requestNo) {
  const users = await prisma.user.findMany({
    where: { role: { in: ['SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER'] }, status: 'ACTIVE' }
  });
  await prisma.notification.createMany({
    data: users.map((user) => ({
      userId: user.id,
      title: 'New Certificate Request Received',
      message: `Request ${requestNo} is ready for review.`
    }))
  });
}

requestsRouter.post('/public', validate(requestSchema), asyncHandler(async (req, res) => {
  const requestNo = `AAS-${Date.now()}`;
  const student = await prisma.student.upsert({
    where: { studentId: req.body.studentId },
    update: { ...req.body, dateOfBirth: new Date(req.body.dateOfBirth), mobile2: req.body.mobile2 || null },
    create: { ...req.body, dateOfBirth: new Date(req.body.dateOfBirth), mobile2: req.body.mobile2 || null }
  });

  const certificateRequest = await prisma.certificateRequest.create({
    data: { studentId: student.id, requestNo },
    include: { student: true }
  });

  await notifyNewRequest(requestNo);
  await audit(null, 'PUBLIC_REQUEST', `Student ${student.studentId} submitted certificate request ${requestNo}`);
  res.status(201).json({ request: certificateRequest });
}));

requestsRouter.get('/verify/:requestNo', asyncHandler(async (req, res) => {
  const request = await prisma.certificateRequest.findFirst({
    where: { requestNo: req.params.requestNo },
    include: {
      student: {
        select: {
          studentName: true,
          studentId: true,
          faculty: true,
          department: true,
          graduationYear: true,
          academicYear: true,
          modeOfStudy: true
        }
      }
    }
  });
  if (!request) return res.status(404).json({ message: 'Certificate request not found' });
  res.json({ request });
}));

requestsRouter.use(requireAuth);

requestsRouter.get('/', allowRoles('SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER', 'FINANCE_USER'), asyncHandler(async (req, res) => {
  const { status, search = '', page = 1, limit = 10 } = req.query;
  const where = {
    ...(status ? { status } : {}),
    OR: [
      { requestNo: { contains: search, mode: 'insensitive' } },
      { student: { studentName: { contains: search, mode: 'insensitive' } } },
      { student: { studentId: { contains: search, mode: 'insensitive' } } }
    ]
  };

  const [requests, total] = await Promise.all([
    prisma.certificateRequest.findMany({
      where,
      include: { student: true, documents: true },
      orderBy: { submittedAt: 'desc' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    }),
    prisma.certificateRequest.count({ where })
  ]);

  res.json({ requests, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}));

requestsRouter.patch('/:id/status', allowRoles('SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER', 'FINANCE_USER'), validate(statusSchema), asyncHandler(async (req, res) => {
  const timestamps = {
    ACCEPTED: { approvedAt: new Date() },
    REJECTED: { rejectedAt: new Date() },
    COMPLETED: { completedAt: new Date() }
  };
  const request = await prisma.certificateRequest.update({
    where: { id: req.params.id },
    data: { status: req.body.status, ...(timestamps[req.body.status] || {}) },
    include: { student: true, documents: true }
  });
  await audit(req.user.id, 'UPDATE_REQUEST_STATUS', `Changed ${request.requestNo} to ${request.status}`);
  res.json({ request });
}));

requestsRouter.post('/:id/pdf', allowRoles('SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER', 'FINANCE_USER'), asyncHandler(async (req, res) => {
  const request = await prisma.certificateRequest.findUnique({
    where: { id: req.params.id },
    include: { student: true }
  });
  if (!request) return res.status(404).json({ message: 'Request not found' });

  const document = await createCertificatePdf(request);
  const updated = await prisma.certificateRequest.update({
    where: { id: request.id },
    data: {
      pdfUrl: document.filePath,
      documents: { create: document }
    },
    include: { student: true, documents: true }
  });
  await audit(req.user.id, 'GENERATE_PDF', `Generated PDF for ${request.requestNo}`);
  res.json({ request: updated, document });
}));
