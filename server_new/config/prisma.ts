import { PrismaClient } from '@prisma/client';
import { config } from './index';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: config.DATABASE_URL,
    log: config.isDevelopment
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
  });

if (config.isDevelopment) {
  globalForPrisma.prisma = prisma;
}
