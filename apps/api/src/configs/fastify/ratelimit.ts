import fastifyRateLimit from "@fastify/rate-limit";
import { logger } from "@index";
import { FastifyInstance } from "fastify";

export const initFastifyRateLimit = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  logger.debug("Trying to register @fastify/rate-limit plugin");
  await server.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute"
  });
  logger.debug("Successfully registered @fastify/rate-limit");
  return server;
};