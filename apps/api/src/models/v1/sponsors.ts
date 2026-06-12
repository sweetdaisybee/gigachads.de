import { tSponsor } from "@gigachads.de/shared/schemas/v1";

export class ModelSponsor {
  private readonly id: number;
  private readonly uuid: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly name: string;
  private readonly emoji: string;
  private readonly uri: string;
  private readonly past: boolean;
  constructor(opts: tSponsor) {
    this.id = opts.id;
    this.uuid = opts.uuid;
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
    this.name = opts.name;
    this.emoji = opts.emoji;
    this.uri = opts.uri;
    this.past = opts.past;
  }
  public readonly getId = (): tSponsor["id"] => {
    return this.id;
  };
  public readonly getUuid = (): tSponsor["uuid"] => {
    return this.uuid;
  };  
  public readonly getName = (): tSponsor["name"] => {
    return this.name;
  };
};
