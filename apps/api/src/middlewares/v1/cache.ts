import { env } from "@configs/index.js";
import { logger, redis } from "@index";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";

export class MiddlewareRedis {
  private readonly redisEnabled: boolean;
  constructor() {
    this.redisEnabled = env.REDIS_ENABLED;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly cache = (): preHandlerHookHandler => {
    return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      if (!this.redisEnabled) {
        return;
      }
      const { url } = request;
      const cacheData = await redis.get(url);
      if (!cacheData) {
        logger.debug(`Cache miss: ${url}`)
        return;
      } else {
        logger.trace(`Cached data: ${cacheData}`);
        logger.debug(`Cache hit: ${url}`)
        reply.send(JSON.parse(cacheData))
        return;
      };
    };
  };
};
