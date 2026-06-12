import { FactoryErrors } from "@factoriesV1/errors.js";
import { PrismaClientKnownRequestError } from "@gigachads.de/prisma";
import { tCreatePlacementsBody, tDeletePlacementsByUuidParams, tGetPlacementsByUuidParams, tGetPlacementsQuery, tPatchPlacementsByUuidBody, tPatchPlacementsByUuidParams } from "@gigachads.de/shared/schemas/v1";
import { RepositoryPlacements } from "@repositoriesV1/placements.js";
import { FastifyReply, FastifyRequest } from "fastify";

export class ControllerPlacements {
  private readonly repoPlacements: RepositoryPlacements;
  private readonly factErrors: FactoryErrors;
  constructor() {
    this.repoPlacements = new RepositoryPlacements();
    this.factErrors = new FactoryErrors();
  }
  //---------------------------------------------GET---------------------------------------------//
  public readonly getAll = async(
    request: FastifyRequest<{
      Querystring: tGetPlacementsQuery
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const query: tGetPlacementsQuery = request.query;
    const placements = await this.repoPlacements.getAll({
      query: query
    });
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved all placements`,
      },
      data: placements
    });
  };
  //---------------------------------------------GET---------------------------------------------//
  public readonly getByUuid = async(
    request: FastifyRequest<{
      Params: tGetPlacementsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tGetPlacementsByUuidParams = request.params;
    const placement = await this.repoPlacements.getByUuid({
      search: params
    });
    if (!placement) {
      const error = this.factErrors.createNotFound(
        `Couldn't find placement with uuid ${params.uuid}`
      );
      throw error;
    }
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Retrieved placement with UUID ${placement.getUuid()}`,
      },
      data: placement
    });
  };
  //--------------------------------------------POST---------------------------------------------//
  public readonly create = async(
    request: FastifyRequest<{
      Body: tCreatePlacementsBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const body: tCreatePlacementsBody = request.body;
    try {
      const placement = await this.repoPlacements.create({
        data: body
      });
      return reply.default({
        meta: {
          statusCode: 201,
          status: "Created",
          message: `Created placement ${placement.getUuid()}`,
        },
        data: placement
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          throw this.factErrors.createConflict(
            "This record already exits"
          )
        }
      }
      throw error;
    }
  };
  //-------------------------------------------PATCH---------------------------------------------//
  public readonly patchByUuid = async(
    request: FastifyRequest<{
      Params: tPatchPlacementsByUuidParams,
      Body: tPatchPlacementsByUuidBody
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tPatchPlacementsByUuidParams = request.params;
    const body: tPatchPlacementsByUuidBody = request.body;
    const placements = await this.repoPlacements.patchByUuid({
      search: params,
      data: body
    });
    if (!placements) {
      const error = this.factErrors.createNotFound(
        `Couldn't find placement with UUID ${params.uuid}`
      );
      throw error;  
    };
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Patched placement with UUID ${placements.oldPlacement.getUuid()}`,
      },
      data: placements
    });
  };  
  //------------------------------------------DELETE---------------------------------------------//
  public readonly deleteByUuid = async(
    request: FastifyRequest<{
      Params: tDeletePlacementsByUuidParams
    }>,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    const params: tDeletePlacementsByUuidParams = request.params;
    const placement = await this.repoPlacements.deleteByUuid({
      search: params
    });
    if (!placement) {
      const error = this.factErrors.createNotFound(
        `Couldn't find placement with UUID ${params.uuid}`
      );
      throw error;  
    };
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Deleted placement with UUID ${placement.getUuid()}`,
      },
      data: placement
    });
  };
};
