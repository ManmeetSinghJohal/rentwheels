import { PrismaClient } from "@prisma/client";

// Prevent hot reloading from creating new instances of PrismaClient by storing it as a global variable in development environments only.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
