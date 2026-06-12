import { ControllerSponsors } from "@controllersV1/index.js"
import { MiddlewareAuth } from "@middlewaresV1/index.js";
import { sDeleteSponsors, sGetSponsors, sGetSponsorsByUuid, sPatchSponsorsByUuid, sPostSponsors } from "@schemasV1/sponsors.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const RouteV1Sponsors: FastifyPluginAsyncZod = async(
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const controller = new ControllerSponsors();
  const middlewareAuth = new MiddlewareAuth();
  server.route({
    method: "GET",
    url: "",
    schema: sGetSponsors,
    handler: controller.getAll
  });
  server.route({
    method: "GET",
    url: "/:uuid",
    schema: sGetSponsorsByUuid,
    handler: controller.getByUuid
  });  
  server.route({
    method: "POST",
    url: "",
    schema: sPostSponsors,
    preHandler: [middlewareAuth.verify()],
    handler: controller.create
  });
  server.route({
    method: "PATCH",
    url: "/:uuid",
    schema: sPatchSponsorsByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.patchByUuid
  });
  server.route({
    method: "DELETE",
    url: "/:uuid",
    schema: sDeleteSponsors,
    preHandler: [middlewareAuth.verify()],
    handler: controller.deleteByUuid
  });  
};
