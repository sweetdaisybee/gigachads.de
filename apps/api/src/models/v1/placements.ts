import { tPlacement, tTeam, tYear } from "@gigachads.de/shared/schemas/v1";

export class ModelPlacement {
  private readonly id: number;
  private readonly uuid: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly rank: number;
  private readonly teamId: number;
  private readonly team?: tTeam;
  private readonly yearId: number;
  private readonly year?: tYear;
  constructor(opts: tPlacement) {
    this.id = opts.id;
    this.uuid = opts.uuid;
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
    this.rank = opts.rank;
    this.teamId = opts.teamId;
    this.team = opts.team;
    this.yearId = opts.yearId;
    this.year = opts.year;
  };
  public readonly getUuid = (): ModelPlacement["uuid"] => {
    return this.uuid;
  }
  public readonly getRank = (): ModelPlacement["rank"] => {
    return this.rank;
  }
  public readonly getYear = (): ModelPlacement["year"] => {
    return this.year;
  }
};
