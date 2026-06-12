import { tPassword, tUser } from "@gigachads.de/shared/schemas/v1";

export class ModelPassword {
  private readonly id: number;
  private readonly uuid: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly hash: string;
  private readonly userId: number;
  private readonly user?: tUser | null;
  constructor(opts: tPassword) {
    this.id = opts.id;
    this.uuid = opts.uuid;
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
    this.hash = opts.hash;
    this.userId = opts.userId;
    this.user = opts.user;
  }
  public readonly getHash = (): tPassword["hash"] => {
    return this.hash;
  }
}
