import { FactoryUsers } from "@factoriesV1/users.js";
import { tCreateUsersBody, tDeleteUsersByUuidParams, tGetUsersByEmailParams, tGetUsersByEmailQuery, tGetUsersByNameParams, tGetUsersByNameQuery, tGetUsersByUuidParams } from "@gigachads.de/shared/schemas/v1";
import { logger, prisma } from "@index";
import { ModelUser } from "@modelsV1/users.js";
import argon2 from "argon2";

export class RepositoryUsers {
  private readonly factUsers: FactoryUsers;
  constructor() {
    this.factUsers = new FactoryUsers();
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getAll = async(
  ): Promise<ModelUser[]> => {
    const rawUsers = await prisma.giga_user.findMany({
      include: {
        password: true
      }
    });
    const users: ModelUser[] = [];
    for (const rawUser of rawUsers) {
      const user = this.factUsers.create(rawUser);
      users.push(user);
    }
    return users;
  };
  //---------------------------------------------------------------------------------------------//
  public async getByName(
    opts: {
      search: tGetUsersByNameParams,
      query: tGetUsersByNameQuery
    }
  ): Promise<ModelUser | null> {
    logger.debug(`Trying to retrieve user ${opts.search.name}`);
    const rawUser = await prisma.giga_user.findUnique({
      where: {
        name: opts.search.name
      },
      include: {
        password: opts.query.withPassword
      }
    })
    logger.trace(`Retrieved user ${opts.search.name}: ${JSON.stringify(rawUser)}`);
    if (!rawUser) {
      return null;
    }
    const user = this.factUsers.create(rawUser);
    return user;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getByEmail = async(
    opts: {
      search: tGetUsersByEmailParams,
      query: tGetUsersByEmailQuery
    }
  ): Promise<ModelUser | null> => {
    logger.debug(`Trying to retrieve user with email ${opts.search.email}`);
    const rawUser = await prisma.giga_user.findUnique({
      where: {
        email: opts.search.email
      },
      include: {
        password: opts.query.withPassword
      }
    })
    logger.trace(`Retrieved user ${opts.search.email}: ${JSON.stringify(rawUser)}`);
    if (!rawUser) {
      logger.debug(`User with email ${opts.search.email} was not found`)
      return null;
    }
    const user = this.factUsers.create(rawUser);
    return user;
  }
  //---------------------------------------------------------------------------------------------//
  public readonly getByUuid = async(
    opts: {
      search: tGetUsersByUuidParams,
      query: tGetUsersByNameQuery
    }
  ): Promise<ModelUser | null> => {
    const rawUser = await prisma.giga_user.findUnique({
      where: {
        uuid: opts.search.uuid
      },
      include: {
        password: opts.query.withPassword
      }
    });
    if (!rawUser) {
      return null;
    }
    const user = this.factUsers.create(rawUser);
    return user;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly create = async(
    opts: {
      data: tCreateUsersBody
    }
  ): Promise<ModelUser> => {
    const hash = await argon2.hash(opts.data.password);
    const rawUser = await prisma.giga_user.create({
      data: {
        name: opts.data.name,
        email: opts.data.email,
        password: {
          create: {
            hash: hash
          }
        }
      }
    });
    const user = this.factUsers.create(rawUser);
    return user;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly deleteByUuid = async(
    opts: {
      search: tDeleteUsersByUuidParams
    }
  ): Promise<ModelUser | null> => {
    const user = await this.getByUuid({
      search: {
        uuid: opts.search.uuid
      },
      query: {
        withPassword: false
      }
    });
    if (!user) {
      return null;
    }
    await prisma.giga_user.delete({
      where: {
        uuid: user.getUuid()
      }
    });
    return user;
  }
}