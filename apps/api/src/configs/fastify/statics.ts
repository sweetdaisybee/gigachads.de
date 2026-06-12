import fastifyStatic from "@fastify/static";
import { logger } from "@index";
import { FastifyInstance } from "fastify";
import path from "path";

export const initFastifyStatics = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  logger.debug("Trying to register @fastify/static plugin");
  const webroot: string = path.join(import.meta.dirname, "../../../../web/dist");
  await server.register(fastifyStatic, {
    root: webroot
  });
  logger.trace(`Webroot is at path ${webroot}`)
  logger.debug("Successfully registered @fastify/static");
  return server;
};