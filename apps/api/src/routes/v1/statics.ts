import { MiddlewareAuth } from "@middlewaresV1/index.js";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const RouteV1Statics: FastifyPluginAsyncZod = async (
  server: FastifyInstance,
  _options: FastifyPluginOptions
): Promise<void> => {
  const middlewareAuth = new MiddlewareAuth();
  const publicPaths: string[] = [
    "sponsors",
    "social",
    "contact"
  ];
  const protectedPaths: string[] = [];
  for (const path of publicPaths) {
    server.route({
      method: "GET",
      url: path,
      schema: {
        hide: true
      },
      handler: (_request: FastifyRequest, reply: FastifyReply) => {
        return reply.sendFile("index.html");
      }
    });
  };
  for (const path of protectedPaths) {
    server.route({
      method: "GET",
      url: path,
      schema: {
        hide: true
      },
      preHandler: [middlewareAuth.verify()],
      handler: (_request: FastifyRequest, reply: FastifyReply) => {
        return reply.sendFile("index.html");
      }
    });
  };
};
