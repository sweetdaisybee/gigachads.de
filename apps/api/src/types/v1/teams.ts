import z from "zod/v3";

export const sQuattTeamYear = z.object({
  id: z.number(),
  team_id: z.number(),
  year_id: z.number(),
  endRanking: z.number(),
  canceled: z.number(),
  year_name: z.number()
});

export const sQuattTeam = z.object({
  id: z.number(),
  team_id: z.number(),
  team_name: z.string(),
  calcTotalYears: z.number(),
  calcTotalRankingPoints: z.number(),
  calcTotalPointsPerYear: z.string(),
  calcTotalChampionships: z.number(),
  calcTotalRanking: z.number(),
  prev_team: z.number().nullable(),
  team_years: z.array(sQuattTeamYear)
}).nullable();

export type tQuattTeam = z.infer<typeof sQuattTeam>;
export type tQuattTeamYear = z.infer<typeof sQuattTeamYear>;
