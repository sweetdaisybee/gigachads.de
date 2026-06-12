import { tTeam } from "@gigachads.de/shared/schemas/v1";
import { ModelTeam } from "@modelsV1/teams.js";

export class FactoryTeams {
  public readonly create = (
    opts: tTeam
  ): ModelTeam => {
    return new ModelTeam(opts);
  };
};
