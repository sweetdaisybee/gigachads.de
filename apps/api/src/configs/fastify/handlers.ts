import { logger } from "@index";
import { ModelErrorApi } from "@modelsV1/errors.js";
import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const initFastifyErrorHandler = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  server.setErrorHandler((
    error: unknown,
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    if (error instanceof Error) {
      if (error instanceof ModelErrorApi) {
        return reply.default({
          meta: {
            statusCode: error.statusCode,
            status: error.status,
            message: error.message
          },
          data: null
        })
      };
      if ("validation" in error) {
        return reply.default({
          meta: {
            statusCode: 400,
            status: "Bad Request",
            message: error.message
          },
          data: null
        })     
      };
      if ("statusCode" in error) {
        if (error.statusCode == 429) {
          return reply.default({
            meta: {
              statusCode: 429,
              status: "Too Many Requests",
              message: error.message
            },
            data: null
          })
        }
      }
    };
    logger.error(error);
    return reply.default({
      meta: {
        statusCode: 500,
        status: "Internal Server Error",
        message: "This shouldn't happen :("
      },
      data: null
    });
  });
  return server;
};

export const initFastifyNotFoundHandler = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  server.setNotFoundHandler((
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    return reply.default({
      meta: {
        statusCode: 404,
        status: "Not Found",
        message: "Endpoint doesn't seem to exist"
      },
      data: null
    });
  });
  return server;
};