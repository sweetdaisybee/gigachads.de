import { FactoryPlacements } from "@factoriesV1/placements.js";
import { tCreatePlacementsBody, tDeletePlacementsByUuidParams, tGetPlacementsByUuidParams, tGetPlacementsQuery, tPatchPlacementsByUuidBody, tPatchPlacementsByUuidParams, tPlacement } from "@gigachads.de/shared/schemas/v1";
import { prisma } from "@index";
import { ModelPlacement } from "@modelsV1/index.js";

export class RepositoryPlacements {
  private readonly factPlacements: FactoryPlacements;
  constructor() {
    this.factPlacements = new FactoryPlacements();
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getAll = async(
    opts: {
      query: tGetPlacementsQuery
    } = {
      query: {}
    }
  ): Promise<ModelPlacement[]> => {
    const rawPlacements = await prisma.giga_placement.findMany({
      skip: opts.query.offset,
      take: opts.query.limit,
      include: {
        team: opts.query.withTeams,
        year: opts.query.withYears
      },
      where: {
        team: {
          uuid: opts.query.teamUuid
        },
        year: {
          uuid: opts.query.yearUuid
        }
      }
    });
    const placements: ModelPlacement[] = [];
    for (const rawPlacement of rawPlacements) {
      const placement = this.factPlacements.create(rawPlacement);
      placements.push(placement);
    }
    return placements;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getByUuid = async(
    opts: {
      search: tGetPlacementsByUuidParams
    }
  ): Promise<ModelPlacement | null> => {
    const rawPlacement = await prisma.giga_placement.findUnique({
      where: {
        uuid: opts.search.uuid
      }
    });
    if (!rawPlacement) {
      return null;
    };
    const placement = this.factPlacements.create(rawPlacement);
    return placement;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly create = async(
    opts: {
      data: tCreatePlacementsBody
    }
  ): Promise<ModelPlacement> => {
    const rawPlacement = await prisma.giga_placement.create({
      data: {
        rank: opts.data.rank,
        team: {
          connect: {
            uuid: opts.data.teamUuid
          }
        },
        year: {
          connect: {
            uuid: opts.data.yearUuid
          }
        }
      }
    })
    const placement = this.factPlacements.create(rawPlacement);
    return placement;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly patchByUuid = async(
    opts: {
      search: tPatchPlacementsByUuidParams,
      data: tPatchPlacementsByUuidBody
    }
  ): Promise<{
    oldPlacement: ModelPlacement,
    newPlacement: ModelPlacement
  } | null> => {
    const oldPlacement = await this.getByUuid({
      search: opts.search
    });
    if (!oldPlacement) {
      return null;
    };
    const rawNewPlacement = await prisma.giga_placement.update({
      where: {
        uuid: opts.search.uuid
      },
      data: {
        rank: opts.data.newRank
      }
    });
    const newPlacement = this.factPlacements.create(rawNewPlacement);
    return {
      oldPlacement: oldPlacement,
      newPlacement: newPlacement
    };
  };
  //---------------------------------------------------------------------------------------------//
  public readonly deleteByUuid = async(
    opts: {
      search: tDeletePlacementsByUuidParams
    }
  ): Promise<ModelPlacement | null> => {
    const placement = await this.getByUuid(opts);
    if (!placement) {
      return null;
    };
    await prisma.giga_placement.delete({
      where: {
        uuid: opts.search.uuid
      }
    });
    return placement;
  };  
};
