import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { config } from '../config.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validators.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { audit } from '../utils/audit.js';

export const authRouter = Router();

authRouter.post('/login', validate(loginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.status !== 'ACTIVE') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  await audit(user.id, 'LOGIN', `${user.name} logged in`);

  const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '8h' });
  const { password: _, ...safeUser } = user;
  res.json({ token, user: safeUser });
}));

authRouter.get('/me', requireAuth, (req, res) => {
  const { password: _, ...safeUser } = req.user;
  res.json({ user: safeUser });
});
