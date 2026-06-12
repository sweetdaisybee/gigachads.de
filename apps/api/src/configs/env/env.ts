import z from "zod";
import { toBoolean } from "@gigachads.de/shared/utils";

export const schemaEnv = z.object({
  TZ: z.string().default("Etc/UTC"),
  NODE_ENV: z.enum(["dev", "prod"]).default("prod"),
  FASTIFY_HOST: z.string().default("::"),
  FASTIFY_PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string(),
  CORS_CREDENTIALS: z.string().default("true").transform(toBoolean),
  CORS_METHODS: z.string().transform((str) => str.split(",").map((s) => s.trim())).pipe(z.array(z.enum(["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"]))),
  CORS_MAX_AGE: z.coerce.number().default(86400),
  COOKIE_SECRET: z.string(),
  COOKIE_NAME: z.string().default("gigachads"),
  JWT_SECRET: z.string(),
  REDIS_ENABLED: z.stringbool().default(true),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_IP_FAMILY: z.enum(["4", "6"]).default("4"),
  LOG_ENABLED: z.string().default("true").transform(toBoolean),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  ADMIN_USERNAME: z.string(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_EMAIL: z.string()
});

export const env = schemaEnv.parse(process.env);
