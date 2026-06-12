import { ControllerAuth } from "@controllersV1/index.js"
import { sDeleteAuth, sPostAuth } from "@schemasV1/index.js";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const RouteV1Auth: FastifyPluginAsyncZod = async(
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const controller = new ControllerAuth();
  server.route({
    method: "POST",
    url: "",
    schema: sPostAuth,
    config: {
        rateLimit: {
        max: 5,
        timeWindow: "1 minute"
      }  
    },
    handler: controller.login
  });
  server.route({
    method: "DELETE",
    url: "",
    schema: sDeleteAuth,
    handler: controller.logout
  });
};
