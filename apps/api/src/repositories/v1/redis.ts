import { redis } from "@index";

export class RepositoryRedis {
  public readonly flushAll = async(
  ): Promise<boolean> => {
    await redis.flushall();
    return true;
  };
};
