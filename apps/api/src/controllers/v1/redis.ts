import { RepositoryRedis } from "@repositoriesV1/index.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class ControllerRedis {
  private readonly repoRedis: RepositoryRedis;
  constructor() {
    this.repoRedis = new RepositoryRedis();
  };
  //------------------------------------------DELETE---------------------------------------------//
  public readonly flushAll = async(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const flushSuccessfull = await this.repoRedis.flushAll();
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Flushed redis`,
      },
      data: flushSuccessfull
    });
  };
};
