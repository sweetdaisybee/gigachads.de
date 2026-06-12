import { logger } from "@index";
import { tFastifyInitOpts } from "@typesV1/index.js";
import fastify, { FastifyInstance } from "fastify";
import {
  initFastifyCookie,
  initFastifyCors,
  initFastifyDecorators,
  initFastifyErrorHandler,
  initFastifyJwt,
  initFastifyNotFoundHandler,
  initFastifyRateLimit,
  initFastifyRedis,
  initFastifyRoutes,
  initFastifyStatics,
  initFastifySwagger,
  initFastifyZod
} from "./index.js";

export const initFastify = async (
  opts: tFastifyInitOpts
): Promise<FastifyInstance> => {
  let server: FastifyInstance = fastify();
  server = await initFastifyZod(server);
  server = await initFastifySwagger(server);
  server = await initFastifyDecorators(server);
  server = await initFastifyRedis(server, opts.redis);
  server = await initFastifyStatics(server);
  server = await initFastifyRateLimit(server);
  server = await initFastifyCors(server, opts.cors);
  server = await initFastifyCookie(server, opts.cookie);
  server = await initFastifyJwt(server, opts.jwt);
  server = await initFastifyErrorHandler(server);
  server = await initFastifyNotFoundHandler(server);
  server = await initFastifyRoutes(server);
  // Listen config
  await server.ready();
  await server.listen({
    host: opts.host,
    port: opts.port
  });
  logger.info(`Fastify listening on http://${opts.host}:${opts.port}`);
  return server;
};
