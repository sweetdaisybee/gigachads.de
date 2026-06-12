import { tSponsor } from "@gigachads.de/shared/schemas/v1";
import { ModelSponsor } from "@modelsV1/sponsors.js";

export class FactorySponsors {
  public readonly create = (
    opts: tSponsor
  ): ModelSponsor => {
    return new ModelSponsor(opts);
  };
};
