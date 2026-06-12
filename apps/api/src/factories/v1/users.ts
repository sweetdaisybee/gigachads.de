import { tUser } from "@gigachads.de/shared/schemas/v1";
import { ModelUser } from "@modelsV1/index.js";

export class FactoryUsers {
  public readonly create = (
    opts: tUser
  ): ModelUser => {
    return new ModelUser(opts);
  };
};
