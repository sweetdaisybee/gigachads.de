import { FactoryErrors } from "@factoriesV1/errors.js";
import { tCreateYearsBody, tDeleteYearsByUuidParams, tGetYearsByUuidParams, tGetYearsQuery, tPatchYearsByUuidBody, tPatchYearsByUuidParams } from "@gigachads.de/shared/schemas/v1";
import { RepositoryYears } from "@repositoriesV1/years.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class ControllerYears {
  private readonly repoYears: RepositoryYears;
  private readonly factErrors: FactoryErrors;
  constructor() {
    this.repoYears = new RepositoryYears();
    this.factErrors = new FactoryErrors();
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getAll = async(
    request: FastifyRequest<{
      Querystring: tGetYearsQuery
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const query = request.query;
    const years = await this.repoYears.getAll({
      query: query
    });
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved all years`,
      },
      data: years
    });
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getByUuid = async(
    request: FastifyRequest<{
      Params: tGetYearsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tGetYearsByUuidParams = request.params;
    const year = await this.repoYears.getByUuid({
      search: params
    });
    if (!year) {
      const error = this.factErrors.createNotFound(
        `Couldn't find year with UUID ${params.uuid}`
      );
      throw error;
    }
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved year with UUID ${year.getUuid()}`,
      },
      data: year
    });
  };
  //--------------------------------------------POST---------------------------------------------//
  public readonly create = async(
    request: FastifyRequest<{
      Body: tCreateYearsBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const body: tCreateYearsBody = request.body;
    const year = await this.repoYears.create({
      data: body
    });
    return reply.default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: `Created year ${year.getName()}`,
      },
      data: year
    });
  };
  //-------------------------------------------PATCH---------------------------------------------//
  public readonly patchByUuid = async(
    request: FastifyRequest<{
      Params: tPatchYearsByUuidParams,
      Body: tPatchYearsByUuidBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tPatchYearsByUuidParams = request.params;
    const body: tPatchYearsByUuidBody = request.body;
    const year = await this.repoYears.patchByUuid({
      search: params,
      data: body
    });
    if (!year) {
      const error = this.factErrors.createNotFound(
        `Couldn't find year with UUID ${params.uuid}`
      );
      throw error;
    };
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Pachted year with UUID ${year.oldYear.getName()}`,
      },
      data: year
    });
  };
  //------------------------------------------DELETE---------------------------------------------//
  public readonly delete = async(
    request: FastifyRequest<{
      Params: tDeleteYearsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tDeleteYearsByUuidParams = request.params;
    const year = await this.repoYears.deleteByUuid({
      search: params
    });
    if (!year) {
      const error = this.factErrors.createNotFound(
        `Couldn't find year with UUID ${params.uuid}`
      );
      throw error;
    }
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Deleted year with UUID ${year.getUuid()}`,
      },
      data: year
    });
  };
};
