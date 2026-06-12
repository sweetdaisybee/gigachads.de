import { ControllerYears } from "@controllersV1/index.js"
import { MiddlewareAuth } from "@middlewaresV1/index.js";
import { sDeleteYearsByUuid, sGetYears, sGetYearsByUuid, sPatchYearsByUuid, sPostYears } from "@schemasV1/years.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const RouteV1Years: FastifyPluginAsyncZod = async(
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const controller = new ControllerYears();
  const middlewareAuth = new MiddlewareAuth();
  server.route({
    method: "GET",
    url: "",
    schema: sGetYears,
    handler: controller.getAll
  });
  server.route({
    method: "GET",
    url: "/:uuid",
    schema: sGetYearsByUuid,
    handler: controller.getByUuid
  });
  server.route({
    method: "POST",
    url: "",
    schema: sPostYears,
    preHandler: [middlewareAuth.verify()],
    handler: controller.create
  });
  server.route({
    method: "PATCH",
    url: "/:uuid",
    schema: sPatchYearsByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.patchByUuid
  });
  server.route({
    method: "DELETE",
    url: "/:uuid",
    schema: sDeleteYearsByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.delete
  });
};
