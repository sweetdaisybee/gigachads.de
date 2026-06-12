import { tReply } from "@gigachads.de/shared/schemas/v1";
import { FastifyInstance, FastifyReply } from "fastify";

export const initFastifyDecorators = async (
  server: FastifyInstance
): Promise<FastifyInstance> => {
  server.decorateReply("default", function <T>(
    this: FastifyReply,
    reply: tReply<T>
  ): FastifyReply {
    return this.status(reply.meta.statusCode).send(reply);
  });
  return server;
};
