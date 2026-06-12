import fastifyJwt from "@fastify/jwt";
import { logger } from "@index";
import { tFastifyInitJwtOpts } from "@typesV1/fastify.js";
import { FastifyInstance } from "fastify";

export const initFastifyJwt = async (
  server: FastifyInstance,
  jwtOpts: tFastifyInitJwtOpts
): Promise<FastifyInstance> => {
  logger.debug("Trying to register @fastify/jwt plugin");
  await server.register(fastifyJwt, {
    secret: jwtOpts.secret,
    sign: {
      expiresIn: 900
    },
    cookie: {
      cookieName: jwtOpts.cookieName,
      signed: true
    }
  });
  logger.debug("Successfully registered @fastify/jwt");
  return server;
};