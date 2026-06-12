import { schemaEnv, initPrisma } from "@configs/index.js"

export const env = schemaEnv.parse(process.env);

export const prismaClient = await initPrisma();
export * from "@generated/client/client.js";
export { PrismaClientKnownRequestError } from "@generated/client/internal/prismaNamespace.js"
export * from "@generated/client/internal/prismaNamespace.js"