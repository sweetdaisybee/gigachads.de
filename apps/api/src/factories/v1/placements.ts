import { tPlacement } from "@gigachads.de/shared/schemas/v1";
import { ModelPlacement } from "@modelsV1/index.js";

export class FactoryPlacements {
  public readonly create = (
    opts: tPlacement
  ): ModelPlacement => {
    return new ModelPlacement(opts);
  };
};
