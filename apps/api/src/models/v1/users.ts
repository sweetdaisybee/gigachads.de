import { tPassword, tUser } from "@gigachads.de/shared/schemas/v1";

export class ModelUser {
  private readonly id: number;
  private readonly uuid: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly name: string;
  private readonly email: string;
  private readonly password?: tPassword | null;
  constructor(opts: tUser) {
    this.id = opts.id;
    this.uuid = opts.uuid;
    this.createdAt = opts.createdAt;
    this.updatedAt = opts.updatedAt;
    this.name = opts.name;
    this.email = opts.email;
    this.password = opts.password;
  }
  public readonly getId = (): tUser["id"] => {
    return this.id;
  }
  public readonly getUuid = (): tUser["uuid"] => {
    return this.uuid;
  }
  public readonly getName = (): tUser["name"] => {
    return this.name;
  }
  public readonly getPassword = (): tUser["password"] => {
    return this.password;
  }
  public readonly getEmail = (): tUser["email"] => {
    return this.email;
  }
}