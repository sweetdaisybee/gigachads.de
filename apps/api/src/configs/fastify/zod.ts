import { logger } from "@index";
import { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

export const initFastifyZod = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  logger.debug("Trying to set validator compiler to zod");
  server.setValidatorCompiler(validatorCompiler);
  logger.debug("Successfully set validator compiler to zod");
  logger.debug("Trying to set serializer compiler to zod");
  server.setSerializerCompiler(serializerCompiler);
  logger.debug("Successfully set serializer compiler to zod");
  return server;
};