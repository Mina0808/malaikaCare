import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare const global: {
  prisma: PrismaClient | undefined;
};

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      // log: ["query", "info", "warn"],
    });
  }

  prisma = global.prisma;
}

export { prisma };
