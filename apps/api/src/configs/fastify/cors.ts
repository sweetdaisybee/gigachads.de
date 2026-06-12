import fastifyCors from "@fastify/cors";
import { logger } from "@index";
import { tFastifyInitCorsOpts } from "@typesV1/fastify.js";
import { FastifyInstance } from "fastify";

export const initFastifyCors = async (
  server: FastifyInstance,
  corsOpts: tFastifyInitCorsOpts
): Promise<FastifyInstance> => {
  logger.debug("Trying to register @fastify/cors plugin");
  await server.register(fastifyCors, {
    origin: corsOpts.origin,
    credentials: corsOpts.credentials,
    methods: corsOpts.methods,
    maxAge: corsOpts.maxAge
  });
  logger.debug("Successfully registered @fastify/cors");
  return server;
};