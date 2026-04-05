const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const count = await prisma.superAdmin.count();
    console.log('SuperAdmin table exists, count:', count);
  } catch (e) {
    console.error('SuperAdmin table error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
