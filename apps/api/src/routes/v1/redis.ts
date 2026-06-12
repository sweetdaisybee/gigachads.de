import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyPluginAsyncZod, ZodTypeProvider } from "fastify-type-provider-zod";
import { ControllerRedis } from "@controllersV1/redis.js";
import { sDeleteRedis } from "@schemasV1/index.js";
import { MiddlewareAuth } from "@middlewaresV1/index.js";

export const RouteV1Redis: FastifyPluginAsyncZod = async (
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const controller = new ControllerRedis();
  const middlewareAuth = new MiddlewareAuth();  
  server.route({
    method: "DELETE",
    url: "",
    schema: sDeleteRedis,
    preHandler: [middlewareAuth.verify()],
    config: {
        rateLimit: {
        max: 5,
        timeWindow: "1 minute"
      }  
    },
    handler: controller.flushAll
  });
};
