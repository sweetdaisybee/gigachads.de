import { FactoryTeams } from "@factoriesV1/teams.js";
import { logger, prisma } from "@index";
import { ModelTeam } from "@modelsV1/teams.js";
import { tCreateTeamsBody, tDeleteTeamsByUuidParams, tGetTeamsByQuattIdQuery, tGetTeamsByUuidParams, tGetTeamsQuery, tPatchTeamsByUuidBody, tPatchTeamsByUuidParams } from "@gigachads.de/shared/schemas/v1"
import { fetchJson } from "@utils/index.js";
import { tQuattReply, tQuattTeam } from "@typesV1/index.js";
import { RepositoryPlacements } from "@repositoriesV1/placements.js";
import { RepositoryYears } from "@repositoriesV1/years.js";

export class RepositoryTeams {
  private readonly factTeams: FactoryTeams;
  private readonly repoPlacements: RepositoryPlacements;
  private readonly repoYears: RepositoryYears;
  constructor() {
    this.factTeams = new FactoryTeams();
    this.repoPlacements = new RepositoryPlacements();
    this.repoYears = new RepositoryYears();
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getAll = async(
    opts: {
      query: tGetTeamsQuery
    }
  ): Promise<ModelTeam[]> => {
    const rawTeams = await prisma.giga_team.findMany({
      skip: opts.query.offset,
      take: opts.query.limit,
      where: {
        quattId: opts.query.quattId
      }
    });
    const teams: ModelTeam[] = [];
    for (const rawTeam of rawTeams) {
      const team = this.factTeams.create(rawTeam);
      teams.push(team);
    }
    return teams;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getByUuid = async(
    opts: {
      search: tGetTeamsByUuidParams
    }
  ): Promise<ModelTeam | null> => {
    const rawTeam = await prisma.giga_team.findUnique({
      where: {
        uuid: opts.search.uuid
      }
    });
    if (!rawTeam) {
      return null;
    };
    const team = this.factTeams.create(rawTeam);
    return team;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly getByQuattId = async(
    opts: {
      query: tGetTeamsByQuattIdQuery
    }
  ): Promise<ModelTeam | null> => {
    const rawTeam = await prisma.giga_team.findUnique({
      where: {
        quattId: opts.query.quattId
      },
      include: {
        placements: opts.query.withPlacements ? {
          select: {
            uuid: true,
            rank: true,
            year: opts.query.withYears ? {
              select: {
                uuid: true,
                name: true
              }
            }: false
          }
        } : false
      }
    })
    if (!rawTeam) {
      return null;
    }
    const team = this.factTeams.create(rawTeam);
    return team;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly create = async(
    opts: {
      data: tCreateTeamsBody
    }
  ): Promise<ModelTeam | null> => {
    const reply = await fetchJson<tQuattReply<tQuattTeam[]>>("GET", `/teams/byId/${opts.data.quattId}`);
    const quattTeam = reply.object[0];
    if (!quattTeam) {
      return null;
    };
    const rawTeam = await prisma.giga_team.create({
      data: {
        quattId: quattTeam.id,
        name: opts.data.name
      }
    });
    const team = this.factTeams.create(rawTeam);
    return team;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly patchByUuid = async(
    opts: {
      search: tPatchTeamsByUuidParams,
      data: tPatchTeamsByUuidBody
    }
  ): Promise<{
    oldTeam: ModelTeam,
    newTeam: ModelTeam
  } | null> => {
    const oldTeam = await this.getByUuid({
      search: opts.search
    });
    if (!oldTeam) {
      return null;
    }
    const rawNewTeam = await prisma.giga_team.update({
      where: {
        uuid: opts.search.uuid
      },
      data: {
        name: opts.data.newName,
        quattId: opts.data.newQuattId
      }
    });
    const newTeam = this.factTeams.create(rawNewTeam);
    return {
      oldTeam: oldTeam,
      newTeam: newTeam
    };
  };
  //---------------------------------------------------------------------------------------------//
  public readonly deleteByUuid = async(
    opts: {
      search: tDeleteTeamsByUuidParams
    }
  ): Promise<ModelTeam | null> => {
    const team = await this.getByUuid({
      search: opts.search
    });
    if (!team) {
      return null;
    }
    await prisma.giga_team.delete({
      where: {
        uuid: team.getUuid()
      }
    });
    return team;
  }
  //---------------------------------------------------------------------------------------------//
  // Need to do this whole thing better :(
  public readonly checkIfTeamIsInSync = async(
    opts: {
      search: {
        quattId: number
      }
    }
  ): Promise<boolean | null> => {
    // Get info about the team
    const gigaTeam = await this.getByQuattId({
      query: {
        quattId: opts.search.quattId,
        withPlacements: true,
        withYears: true
      }
    });
    if (!gigaTeam) {
      return null
    }
    const reply = await fetchJson<tQuattReply<tQuattTeam[]>>("GET", `/teams/byId/${gigaTeam.getQuattid()}`);
    const quattTeam = reply.object[0];
    if (!quattTeam) {
      return null;
    }
    // Get info about the placements of the team
    const gigaPlacements = await this.repoPlacements.getAll({
      query: {
        teamUuid: gigaTeam.getUuid(),
        withYears: true
      }
    });
    // Get info about the years
    const gigaYears = await this.repoYears.getAll()

    const gigaYearsNames = new Set(gigaYears.map(year => year.getName()))
    for (const quattYear of quattTeam.team_years) {
      if (!gigaYearsNames.has(quattYear.year_name)) {
        await this.repoYears.create({
          data: {
            name: quattYear.year_name
          }
        })
      }
    }
    const gigaPlacementsRanks = new Set<string>(
      gigaPlacements.map(placement => {
        const key = `${placement.getYear()?.name}:${placement.getRank()}`
        return key
      })
    );
    for (const placement of quattTeam.team_years) {
      const key = `${placement.year_name}:${placement.endRanking}`
      logger.debug(key)
      if (!gigaPlacementsRanks.has(key)) {
        const gigaYear = await this.repoYears.getByName({
          search: {
            name: placement.year_name
          }
        })
        if (!gigaYear) {
          return null;
        }
        await this.repoPlacements.create({
          data: {
            rank: placement.endRanking,
            teamUuid: gigaTeam.getUuid(),
            yearUuid: gigaYear.getUuid()
          }
        })
      }
    }
    logger.debug(`Team ${gigaTeam.getName()} is in sync with the QuattFo API`)
    return true;
  };  
};
