import { tPlacement, tTeam } from "@gigachads.de/shared/schemas/v1";

export class ModelTeam {
  private readonly id: number;
  private readonly uuid: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly quattId: number;
  private readonly name: string;
  private readonly placements?: tPlacement[]
  constructor(opts: tTeam) {
    this.id = opts.id;
    this.uuid = opts.uuid;
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
    this.quattId= opts.quattId;
    this.name = opts.name;
    this.placements = opts.placements;
  };
  public readonly getQuattid = (): ModelTeam["quattId"] => {
    return this.quattId
  }
  public readonly getName = (): ModelTeam["name"] => {
    return this.name
  }
  public readonly getUuid = (): ModelTeam["uuid"] => {
    return this.uuid;
  }
};
