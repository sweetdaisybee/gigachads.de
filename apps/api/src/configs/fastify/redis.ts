import fastifyRedis from "@fastify/redis";
import { logger } from "@index";
import { tFastifyInitRedisOpts } from "@typesV1/fastify.js";
import { FastifyInstance } from "fastify";

export const initFastifyRedis = async (
  server: FastifyInstance,
  redisOpts: tFastifyInitRedisOpts
): Promise<FastifyInstance> => {
  if (!redisOpts.enabled) {
    return server;
  }
  logger.debug("Trying to register @fastify/redis plugin");
  await server.register(fastifyRedis, {
    host: redisOpts.host,
    password: redisOpts.password,
    port: redisOpts.port,
    family: redisOpts.family,
    closeClient: true
  });
  logger.debug("Successfully registered @fastify/redis");
  return server;
};