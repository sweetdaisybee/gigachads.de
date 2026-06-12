import { FactoryErrors } from "@factoriesV1/errors.js";
import {
  tCreateTeamsBody,
  tDeleteTeamsByUuidParams,
  tGetTeamsByQuattIdQuery,
  tGetTeamsQuery,
  tPatchTeamsByUuidBody,
  tPatchTeamsByUuidParams,
  tReply,
} from "@gigachads.de/shared/schemas/v1";
import { redis } from "@index";
import { ModelTeam } from "@modelsV1/teams.js";
import { RepositoryTeams } from "@repositoriesV1/teams.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class ControllerTeams {
  private readonly repoTeams: RepositoryTeams;
  private readonly factErrors: FactoryErrors;
  constructor() {
    this.repoTeams = new RepositoryTeams();
    this.factErrors = new FactoryErrors();
  }
  //---------------------------------------------GET---------------------------------------------//
  public readonly getAll = async(
    request: FastifyRequest<{
      Querystring: tGetTeamsQuery
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const query: tGetTeamsQuery = request.query;
    const teams = await this.repoTeams.getAll({
      query: query
    });
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved all teams`,
      },
      data: teams
    });
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getByQuattId = async(
    request: FastifyRequest<{
      Querystring: tGetTeamsByQuattIdQuery
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const url = request.url;
    const query: tGetTeamsByQuattIdQuery = request.query;
    const team = await this.repoTeams.getByQuattId({
      query: query
    });
    if (!team) {
      const error = this.factErrors.createNotFound(
        `Couldn't find team with QuattFo ID ${query.quattId}`
      );
      throw error;
    }
    await this.repoTeams.checkIfTeamIsInSync({
      search: {
        quattId: team.getQuattid()
      }
    });
    const sanReply: tReply<ModelTeam> = {
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved team with QuattFo ID ${team.getQuattid()}`,
      },
      data: team
    }
    await redis.set(url, JSON.stringify(sanReply), "EX", 300);
    return reply.default(sanReply);
  };
  //--------------------------------------------POST---------------------------------------------//
  public readonly create = async(
    request: FastifyRequest<{
      Body: tCreateTeamsBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const body: tCreateTeamsBody = request.body;
    const team = await this.repoTeams.create({
      data: body
    });
    return reply.default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: `Created team ${team?.getName()}`,
      },
      data: team
    });
  };
  //-------------------------------------------PATCH---------------------------------------------//
  public readonly patchByUuid = async(
    request: FastifyRequest<{
      Params: tPatchTeamsByUuidParams,
      Body: tPatchTeamsByUuidBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tPatchTeamsByUuidParams = request.params;
    const body: tPatchTeamsByUuidBody = request.body;
    const team = await this.repoTeams.patchByUuid({
      search: params,
      data: body
    });
    if (!team) {
      const error = this.factErrors.createNotFound(
        `Couldn't find team with UUID ${params.uuid}`
      );
      throw error;
    }        
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Patched team with UUID ${team.oldTeam.getUuid()}`,
      },
      data: team
    });
  };
  //------------------------------------------DELETE---------------------------------------------//
  public readonly deleteByUuid = async(
    request: FastifyRequest<{
      Params: tDeleteTeamsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tDeleteTeamsByUuidParams = request.params;
    const team = await this.repoTeams.deleteByUuid({
      search: params
    });
    if (!team) {
      const error = this.factErrors.createNotFound(
        `Couldn't find team with UUID ${params.uuid}`
      );
      throw error;
    }    
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Deleted team with UUID ${team.getUuid()}`,
      },
      data: team
    });
  };  
};
