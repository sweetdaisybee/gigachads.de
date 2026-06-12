import { FactorySponsors } from "@factoriesV1/sponsors.js";
import { tCreateSponsorsBody, tDeleteSponsorsByUuidParams, tGetSponsorsByUuidParams, tPatchSponsorsByUuidBody, tPatchSponsorsByUuidParams } from "@gigachads.de/shared/schemas/v1";
import { prisma } from "@index";
import { ModelSponsor } from "@modelsV1/sponsors.js";

export class RepositorySponsors {
  private readonly factSponsors: FactorySponsors;
  constructor() {
    this.factSponsors = new FactorySponsors();
  }
  //---------------------------------------------------------------------------------------------//
  public readonly getAll = async(
  ): Promise<ModelSponsor[]> => {
    const rawSponsors = await prisma.giga_sponsor.findMany();
    const sponsors: ModelSponsor[] = [];
    for (const rawSponsor of rawSponsors) {
      const sponsor = this.factSponsors.create(rawSponsor);
      sponsors.push(sponsor);
    };
    return sponsors;
  };
  //---------------------------------------------------------------------------------------------//
  public async getByUuid(
    opts: {
      search: tGetSponsorsByUuidParams
    }
  ): Promise<ModelSponsor | null> {
    const rawSponsor = await prisma.giga_sponsor.findUnique({
      where: {
        uuid: opts.search.uuid
      }
    });
    if (!rawSponsor) {
      return null;
    };
    const sponsor = this.factSponsors.create(rawSponsor);
    return sponsor;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly create = async(
    opts: {
      data: tCreateSponsorsBody
    }
  ): Promise<ModelSponsor> => {
    const rawSponsor = await prisma.giga_sponsor.create({
      data: {
        name: opts.data.name,
        emoji: opts.data.emoji,
        uri: opts.data.uri,
        past: opts.data.past
      }
    });
    const sponsor = this.factSponsors.create(rawSponsor);
    return sponsor;
  };
  //---------------------------------------------------------------------------------------------//
  public readonly patchByUuid = async(
    opts: {
      search: tPatchSponsorsByUuidParams
      data: tPatchSponsorsByUuidBody
    }
  ): Promise<{
    oldSponsor: ModelSponsor,
    newSponsor: ModelSponsor
  } | null> => {
    const oldSponsor = await this.getByUuid({
      search: opts.search
    });
    if (!oldSponsor) {
      return null;
    };
    const rawNewSponsor = await prisma.giga_sponsor.update({
      where: {
        uuid: opts.search.uuid
      },
      data: {
        name: opts.data.newName,
        emoji: opts.data.newEmoji,
        uri: opts.data.newUri,
        past: opts.data.newPast
      }
    });
    const newSponsor = this.factSponsors.create(rawNewSponsor);
    return {
      oldSponsor: oldSponsor,
      newSponsor: newSponsor
    };
  };
  //---------------------------------------------------------------------------------------------//
  public readonly deleteByUuid = async(
    opts: {
      search: tDeleteSponsorsByUuidParams
    }
  ): Promise<ModelSponsor | null > => {
    const sponsor = await this.getByUuid({
      search: opts.search
    });
    if (!sponsor) {
      return null;
    };
    await prisma.giga_sponsor.delete({
      where: {
        uuid: sponsor.getUuid()
      }
    });
    return sponsor;
  };
};
