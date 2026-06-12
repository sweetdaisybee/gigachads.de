import { FactoryErrors } from "@factoriesV1/errors.js";
import { tCreateUsersBody, tDeleteUsersByUuidParams, tGetSponsorsByUuidParams, tGetUsersByNameQuery } from "@gigachads.de/shared/schemas/v1";
import { RepositoryUsers } from "@repositoriesV1/index.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class ControllerUsers {
  private readonly repoUsers: RepositoryUsers;
  private readonly factErrors: FactoryErrors;
  constructor() {
    this.repoUsers = new RepositoryUsers();
    this.factErrors = new FactoryErrors();
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getAll = async(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const users = await this.repoUsers.getAll();
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved all users`,
      },
      data: users
    });
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getByUuid = async(
    request: FastifyRequest<{
      Querystring: tGetUsersByNameQuery,
      Params: tGetSponsorsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const query: tGetUsersByNameQuery = request.query;
    const params: tGetSponsorsByUuidParams = request.params;
    const user = await this.repoUsers.getByUuid({
      query: query,
      search: params
    });
    if (!user) {
      const error = this.factErrors.createNotFound(
        `Couldn't find user with UUID ${params.uuid}`
      );
      throw error;
    };
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved user with UUID ${user.getUuid()}`,
      },
      data: user
    });
  };
  //--------------------------------------------POST---------------------------------------------//
  public readonly create = async(
    request: FastifyRequest<{
      Body: tCreateUsersBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const body: tCreateUsersBody = request.body;
    const user = await this.repoUsers.create({
      data: body
    });
    return reply.default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: `Created user ${user.getName()}`,
      },
      data: user
    });
  };
  //------------------------------------------DELETE---------------------------------------------//
  public readonly deleteByUuid = async(
    request: FastifyRequest<{
      Params: tDeleteUsersByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tDeleteUsersByUuidParams = request.params;
    const user = await this.repoUsers.deleteByUuid({
      search: params
    });
    if (!user) {
      const error = this.factErrors.createNotFound(
        `Couldn't find user with UUID ${params.uuid}`
      );
      throw error;
    };
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Deleted user with UUID ${user.getUuid()}`,
      },
      data: user
    });
  };
};
