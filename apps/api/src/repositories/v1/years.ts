import { FactoryYears } from "@factoriesV1/years.js";
import { tCreateYearsBody, tDeleteYearsByUuidParams, tGetYearsByNameParams, tGetYearsByUuidParams, tGetYearsQuery, tPatchYearsByUuidBody, tPatchYearsByUuidParams, tYear } from "@gigachads.de/shared/schemas/v1";
import { prisma } from "@index";
import { ModelYear } from "@modelsV1/years.js";

export class RepositoryYears {
  private readonly factYears: FactoryYears;
  constructor() {
    this.factYears = new FactoryYears();
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getAll = async(
    opts: {
      query: tGetYearsQuery
    } = {
      query: {}
    }
  ): Promise<ModelYear[]> => {
    const rawYears = await prisma.giga_year.findMany({
      skip: opts.query.offset,
      take: opts.query.limit,
      include: {
        placements: opts.query.withPlacements
      }
    });
    const years: ModelYear[] = [];
    for (const rawYear of rawYears) {
      const year = this.factYears.create(rawYear)
      years.push(year)
    }
    return years;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getByUuid = async(
    opts: {
      search: tGetYearsByUuidParams
    }
  ): Promise<ModelYear | null> => {
    const rawYear = await prisma.giga_year.findUnique({
      where: {
        uuid: opts.search.uuid
      }
    });
    if (!rawYear) {
      return null;
    }
    const year = this.factYears.create(rawYear);
    return year;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getByName = async(
    opts: {
      search: tGetYearsByNameParams
    }
  ): Promise<ModelYear | null> => {
    const rawYear = await prisma.giga_year.findUnique({
      where: {
        name: opts.search.name
      }
    });
    if (!rawYear) {
      return null;
    }
    const year = this.factYears.create(rawYear);
    return year;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly create = async(
    opts: {
      data: tCreateYearsBody
    }
  ): Promise<ModelYear> => {
    const rawYear = await prisma.giga_year.create({
      data: {
        name: opts.data.name
      }
    })
    const year = this.factYears.create(rawYear);
    return year;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly patchByUuid = async(
    opts: {
      search: tPatchYearsByUuidParams,
      data: tPatchYearsByUuidBody
    }
  ): Promise<{
    oldYear: ModelYear,
    newYear: ModelYear
  } | null> => {
    const oldYear = await this.getByUuid({
      search: opts.search
    });
    if (!oldYear) {
      return null;
    }
    const rawNewYear = await prisma.giga_year.update({
      where: {
        uuid: opts.search.uuid
      },
      data: {
        name: opts.data.newName
      }
    });
    const newYear = this.factYears.create(rawNewYear);
    return {
      oldYear: oldYear,
      newYear: newYear
    };
  };
  //---------------------------------------------------------------------------------------------//
  public readonly deleteByUuid = async(
    opts: {
      search: tDeleteYearsByUuidParams
    }
  ): Promise<ModelYear | null> => {
    const year = await this.getByUuid({
      search: opts.search
    });
    if (!year) {
      return null;
    }
    await prisma.giga_year.delete({
      where: {
        uuid: year.getUuid()
      }
    });
    return year;
  };
};
