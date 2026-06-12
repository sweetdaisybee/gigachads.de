import { tYear } from "@gigachads.de/shared/schemas/v1";
import { ModelYear } from "@modelsV1/years.js";

export class FactoryYears {
  public readonly create = (
    opts: tYear
  ): ModelYear => {
    return new ModelYear(opts);
  };
};
