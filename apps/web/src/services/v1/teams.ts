import { tTeam, tReply } from "@gigachads.de/shared/schemas/v1"
import { fetchJson } from "@utils/index.js"

export const getTeamWithPlacements = async (
  quattId: number
): Promise<tTeam> => {
  const reply = await fetchJson<tReply<tTeam>>("GET", `/api/v1/teams/${quattId}?quattId=334&withPlacements=true&withYears=true`);
  if (!reply.data) {
    throw new Error("Couldn't find team")
  }
  return reply.data;
};
