import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { prisma } from '../db.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || user.status !== 'ACTIVE') return res.status(401).json({ message: 'Account is not active' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };
}
