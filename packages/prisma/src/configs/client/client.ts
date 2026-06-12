import { PrismaClient } from "@generated/client/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from "@index";

export const initPrisma = async(): Promise<PrismaClient> => {
  const adapter = new PrismaBetterSqlite3({
    url: env.DATABASE_URL
  })
  const client = new PrismaClient({ adapter });
  return client;
};
