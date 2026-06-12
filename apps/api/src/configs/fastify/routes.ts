import { logger } from "@index";
import { RouteV1Placements, RouteV1Sponsors, RouteV1Statics, RouteV1Teams, RouteV1Years, RouteV1Users, RouteV1Redis, RouteV1Auth } from "@routesV1/index.js";
import { FastifyInstance } from "fastify";

export const initFastifyRoutes = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  await server.register(RouteV1Years, { prefix: "/api/v1/years" });
  await server.register(RouteV1Placements, { prefix: "/api/v1/placements" });
  await server.register(RouteV1Teams, { prefix: "/api/v1/teams" });
  await server.register(RouteV1Sponsors, { prefix: "/api/v1/sponsors" });
  await server.register(RouteV1Redis, { prefix: "/api/v1/redis" });
  await server.register(RouteV1Statics, { prefix: "/" });
  await server.register(RouteV1Users, { prefix: "/api/v1/users" });
  await server.register(RouteV1Auth, { prefix: "/api/v1/auth" });
  logger.debug("Successfully routed the routes");
  return server;
};