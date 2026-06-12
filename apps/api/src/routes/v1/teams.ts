import { ControllerTeams } from "@controllersV1/index.js"
import { MiddlewareAuth, MiddlewareRedis } from "@middlewaresV1/index.js";
import { sDeleteTeamsByUuid, sGetTeams, sGetTeamsByQuattid, sPatchTeamsByUuid, sPostTeams } from "@schemasV1/teams.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const RouteV1Teams: FastifyPluginAsyncZod = async(
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const controller = new ControllerTeams();
  const middlewareAuth = new MiddlewareAuth();
  const middlewareRedis = new MiddlewareRedis();
  server.route({
    method: "GET",
    url: "",
    schema: sGetTeams,
    handler: controller.getAll
  });
  server.route({
    method: "GET",
    url: "/:quattId",
    schema: sGetTeamsByQuattid,
    preHandler: [middlewareRedis.cache()],
    handler: controller.getByQuattId
  });
  server.route({
    method: "POST",
    url: "",
    schema: sPostTeams,
    preHandler: [middlewareAuth.verify()],
    handler: controller.create
  });
  server.route({
    method: "PATCH",
    url: "/:uuid",
    schema: sPatchTeamsByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.patchByUuid
  });
  server.route({
    method: "DELETE",
    url: "/:uuid",
    schema: sDeleteTeamsByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.deleteByUuid
  });  
};
