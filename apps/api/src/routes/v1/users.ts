import { ControllerUsers } from "@controllersV1/index.js"
import { MiddlewareAuth } from "@middlewaresV1/index.js";
import { sDeleteUsersByUuid, sGetUsers, sGetUsersByUuid, sPostUsers } from "@schemasV1/users.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const RouteV1Users: FastifyPluginAsyncZod = async(
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const controller = new ControllerUsers();
  const middlewareAuth = new MiddlewareAuth();
  server.route({
    method: "GET",
    url: "",
    schema: sGetUsers,
    preHandler: [middlewareAuth.verify()],
    handler: controller.getAll
  });
  server.route({
    method: "GET",
    url: "/:uuid",
    schema: sGetUsersByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.getByUuid
  });  
  server.route({
    method: "POST",
    url: "",
    schema: sPostUsers,
    preHandler: [middlewareAuth.verify()],
    handler: controller.create
  });
  server.route({
    method: "DELETE",
    url: "/:uuid",
    schema: sDeleteUsersByUuid,
    preHandler: [middlewareAuth.verify()],
    handler: controller.deleteByUuid
  });    
};
