import { tSponsor, tReply } from "@gigachads.de/shared/schemas/v1"
import { fetchJson } from "@utils/index.js"

export const getAllSponsors = async (): Promise<tSponsor[]> => {
  const reply = await fetchJson<tReply<tSponsor[]>>("GET", `/api/v1/sponsors`);
  if (!reply.data) {
    throw new Error("Couldn't find sponsors")
  };
  return reply.data;
};
