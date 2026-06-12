import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { logger } from "@index";
import { FastifyInstance } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const initFastifySwagger = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  logger.debug("Trying to register @fastify/swagger plugin");
  server.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.1",
      info: {
        title: "gigachads.de",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform
  });
  logger.debug("Trying to register @fastify/swagger-ui plugin");
  server.register(fastifySwaggerUi, {
    routePrefix: "/api/docs",
    uiConfig: {
      docExpansion: "none",
      deepLinking: true
    }
  });
  logger.debug("Successfully registered @fastify/swagger");
  logger.debug("Successfully registered @fastify/swagger-ui");
  return server;
};
