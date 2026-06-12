import z from "zod/v3";

export const sQuattYearSettings = z.object({
  isTest: z.number(),
  currentYear_id: z.number(),
  currentDay_id: z.number(),
  alwaysAutoUpdateResults: z.number(),
  showScheduleHoursBefore: z.number(),
  time2LoginMinsBeforeFrom: z.number(),
  time2LoginMinsAfterUntil: z.number(),
  time2MatchEndMinAfterFrom: z.number(),
  time2ConfirmMinsAfterFrom: z.number(),
  time2ConfirmMinsAfterUntil: z.number(),
  showEndRanking: z.number(),
  showLocalStorageScore: z.number(),
  maxPhotos: z.number(),
  autoLogoutSecsAfter: z.number(),
  useLiveScouting: z.number(),
  usePlayOff: z.number(),
  usePush: z.number(),
  useRefereeName: z.number(),
  useResourceContentApi: z.number(),
  showArchieve: z.number(),
  usePushTokenRatings: z.number(),
});

export const sQuattYear = z.object({
  id: z.number(),
  name: z.string(),
  day1: z.string(),
  day2: z.string(),
  teamsCount: z.number(),
  daysCount: z.number(),
  isTest: z.number(),
  isCurrent: z.number(),
  currentDay_id: z.number(),
  alwaysAutoUpdateResults: z.number(),
  day: z.string(),
  settings: sQuattYearSettings
});

export type tQuattYear = z.infer<typeof sQuattYear>;
export type tQuattYearSettings = z.infer<typeof sQuattYearSettings>;
