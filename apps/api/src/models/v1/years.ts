import { tPlacement, tYear } from "@gigachads.de/shared/schemas/v1";

export class ModelYear {
  private readonly id: number;
  private readonly uuid: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly name: number;
  private readonly placements?: tPlacement[]
  constructor(opts: tYear) {
    this.id = opts.id;
    this.uuid = opts.uuid;
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
    this.name = opts.name;
    this.placements = opts.placements
  };
  public readonly getUuid = (): ModelYear["uuid"] => {
    return this.uuid;
  };
  public readonly getName = (): ModelYear["name"] => {
    return this.name;
  };
};
