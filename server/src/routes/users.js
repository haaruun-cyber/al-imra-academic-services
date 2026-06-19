import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../db.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { userSchema } from '../validators.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { audit } from '../utils/audit.js';

export const usersRouter = Router();

usersRouter.use(requireAuth, allowRoles('SUPER_ADMIN'));

usersRouter.get('/', asyncHandler(async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, status: true, permissions: true, createdAt: true }
  });
  res.json({ users });
}));

usersRouter.post('/', validate(userSchema), asyncHandler(async (req, res) => {
  const password = await bcrypt.hash(req.body.password || 'Admin@12345', 12);
  const user = await prisma.user.create({ data: { ...req.body, password } });
  await audit(req.user.id, 'CREATE_USER', `Created user ${user.email}`);
  const { password: _, ...safeUser } = user;
  res.status(201).json({ user: safeUser });
}));

usersRouter.put('/:id', validate(userSchema), asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.password) data.password = await bcrypt.hash(data.password, 12);
  else delete data.password;

  const user = await prisma.user.update({ where: { id: req.params.id }, data });
  await audit(req.user.id, 'UPDATE_USER', `Updated user ${user.email}`);
  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser });
}));

usersRouter.delete('/:id', asyncHandler(async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  await audit(req.user.id, 'DELETE_USER', `Deleted user ${req.params.id}`);
  res.status(204).send();
}));
