import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  ['Super Admin', 'superadmin@alimra.edu', 'SUPER_ADMIN'],
  ['Admin User', 'admin@alimra.edu', 'ADMIN'],
  ['Registrar User', 'registrar@alimra.edu', 'REGISTRAR_USER'],
  ['Finance User', 'finance@alimra.edu', 'FINANCE_USER']
];

async function main() {
  const password = await bcrypt.hash('Admin@12345', 12);

  for (const [name, email, role] of users) {
    await prisma.user.upsert({
      where: { email },
      update: { name, role: Role[role], status: 'ACTIVE', password },
      create: { name, email, role: Role[role], password, status: 'ACTIVE' }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
