import fastifyCookie from "@fastify/cookie";
import { logger } from "@index";
import { tFastifyInitCookieOpts } from "@typesV1/fastify.js";
import { FastifyInstance } from "fastify";

export const initFastifyCookie = async (
  server: FastifyInstance,
  cookieOpts: tFastifyInitCookieOpts
): Promise<FastifyInstance> => {
  logger.debug("Trying to register @fastify/cookie plugin");
  await server.register(fastifyCookie, {
    secret: cookieOpts.secret,
    parseOptions: {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      signed: true
    }
  });
  logger.debug("Successfully registered @fastify/cookie");
  return server;
};