import { ControllerPlacements } from "@controllersV1/index.js"
import { sDeletePlacementsByUuid, sGetPlacements, sGetPlacementsByUuid, sPatchPlacementsByUuid, sPostPlacements } from "@schemasV1/placements.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { MiddlewareAuth } from "@middlewaresV1/index.js";

export const RouteV1Placements: FastifyPluginAsyncZod = async(
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const controller = new ControllerPlacements();
  const middlewareAuth = new MiddlewareAuth();
  server.route({
    method: "GET",
    url: "",
    schema: sGetPlacements,
    handler: controller.getAll
  });
  server.route({
    method: "GET",
    url: "/:uuid",
    schema: sGetPlacementsByUuid,
    handler: controller.getByUuid
  });
  server.route({
    method: "POST",
    url: "",
    schema: sPostPlacements,
    preHandler: [middlewareAuth.verify()],
    handler: controller.create
  });
  server.route({
    method: "PATCH",
    url: "/:uuid",
    schema: sPatchPlacementsByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.patchByUuid
  });
  server.route({
    method: "DELETE",
    url: "/:uuid",
    schema: sDeletePlacementsByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.deleteByUuid
  });
};
