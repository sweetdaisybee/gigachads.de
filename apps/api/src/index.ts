import {
  env
} from "@configs/index.js";
import {
  initFastify,
  initPino,
  seedPrisma
} from "@configs/index.js";
import {
  prismaClient,
} from "@gigachads.de/prisma"
import { RepositoryTeams } from "@repositoriesV1/teams.js";

// Init the logger
export const logger = await initPino({
  nodeEnv: env.NODE_ENV,
  enabled: env.LOG_ENABLED,
  level: env.LOG_LEVEL
});
// Init the fastify instance
export const server = await initFastify({
  host: env.FASTIFY_HOST,
  port: env.FASTIFY_PORT,
  redis: {
    enabled: env.REDIS_ENABLED,
    host: env.REDIS_HOST,
    password: env.REDIS_PASSWORD,
    port: env.REDIS_PORT,
    family: Number(env.REDIS_IP_FAMILY)
  },
  cors: {
    origin: env.CORS_ORIGIN,
    credentials: env.CORS_CREDENTIALS,
    methods: env.CORS_METHODS,
    maxAge: env.CORS_MAX_AGE
  },
  jwt: {
    secret: env.JWT_SECRET,
    cookieName: env.COOKIE_NAME
  },
  cookie: {
    secret: env.COOKIE_SECRET
  }
});
export const redis = server.redis
// Init and seed the prisma client
export const prisma = prismaClient;
await seedPrisma();

// const repo = new RepositoryTeams();
// repo.checkIfTeamIsInSync(131)