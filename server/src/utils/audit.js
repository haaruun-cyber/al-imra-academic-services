import { prisma } from '../db.js';

export async function audit(userId, action, description) {
  await prisma.auditLog.create({
    data: { userId: userId || null, action, description }
  });
}
