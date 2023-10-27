import { PrismaClient } from "@prisma/client";

let globalWithPrisma = global as typeof globalThis & {
  prisma: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;