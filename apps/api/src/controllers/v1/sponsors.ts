import { FactoryErrors } from "@factoriesV1/errors.js";
import { tCreateSponsorsBody, tDeleteSponsorsByUuidParams, tGetSponsorsByUuidParams, tPatchSponsorsByUuidBody, tPatchSponsorsByUuidParams } from "@gigachads.de/shared/schemas/v1";
import { RepositorySponsors } from "@repositoriesV1/sponsors.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class ControllerSponsors {
  private readonly repoSponsors: RepositorySponsors;
  private readonly factErrors: FactoryErrors;
  constructor() {
    this.repoSponsors = new RepositorySponsors();
    this.factErrors = new FactoryErrors();
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getAll = async(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const sponsors = await this.repoSponsors.getAll();
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved all sponsors`,
      },
      data: sponsors
    });
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getByUuid = async(
    request: FastifyRequest<{
      Params: tGetSponsorsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tGetSponsorsByUuidParams = request.params;
    const sponsor = await this.repoSponsors.getByUuid({
      search: params
    });
    if (!sponsor) {
      const error = this.factErrors.createNotFound(
        `Couldn't find sponsor with UUID ${params.uuid}`
      );
      throw error;
    }
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved sponsor with UUID ${sponsor.getUuid()}`,
      },
      data: sponsor
    });
  };
  //--------------------------------------------POST---------------------------------------------//
  public readonly create = async(
    request: FastifyRequest<{
      Body: tCreateSponsorsBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const body: tCreateSponsorsBody = request.body;
    const sponsor = await this.repoSponsors.create({
      data: body
    });
    return reply.default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: `Created sponsor ${sponsor.getName()}`,
      },
      data: sponsor
    });
  };
  //-------------------------------------------PATCH---------------------------------------------//
  public readonly patchByUuid = async(
    request: FastifyRequest<{
      Params: tPatchSponsorsByUuidParams,
      Body: tPatchSponsorsByUuidBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tPatchSponsorsByUuidParams = request.params;
    const body: tPatchSponsorsByUuidBody = request.body;
    const sponsor = await this.repoSponsors.patchByUuid({
      search: params,
      data: body
    });
    if (!sponsor) {
      const error = this.factErrors.createNotFound(
        `Couldn't find sponsor with UUID ${params.uuid}`
      );
      throw error;
    }
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Patched sponsor with UUID ${sponsor.oldSponsor.getUuid()}`,
      },
      data: sponsor
    });
  };
  //------------------------------------------DELETE---------------------------------------------//
  public readonly deleteByUuid = async(
    request: FastifyRequest<{
      Params: tDeleteSponsorsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tDeleteSponsorsByUuidParams = request.params;
    const sponsor = await this.repoSponsors.deleteByUuid({
      search: params
    });
    if (!sponsor) {
      const error = this.factErrors.createNotFound(
        `Couldn't find sponsor with UUID ${params.uuid}`
      );
      throw error;
    }
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Deleted sponsor with UUID ${sponsor.getUuid()}`,
      },
      data: sponsor
    });
  };
};
