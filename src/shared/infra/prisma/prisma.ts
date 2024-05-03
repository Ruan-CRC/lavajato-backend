import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'DEV' ? ['query'] : [],
});

export default prisma;
