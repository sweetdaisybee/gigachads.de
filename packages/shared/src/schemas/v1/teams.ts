import { sPlacement, sSharedPlacement, tPlacement, tSharedPlacement } from "@schemasV1/placements.js";
import z from "zod"

// Example
export const exampleTeam = {
  id: 0,
  uuid: crypto.randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  quattId: 334,
  name: "Giga Chads"
};

// Schemas
export type tTeam = {
  id: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  quattId: number;
  name: string;
  placements?: tPlacement[];
};
export const sTeam: z.ZodObject = z.object({
  id: z.number(),
  uuid: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  quattId: z.number(),
  name: z.string(),
  placements: z.lazy(()=> z.array(sPlacement)).optional()
});

export const exampleSharedTeam = {
  uuid: crypto.randomUUID(),
  quattId: 334,
  name: "Giga Chads"
}

export type tSharedTeam = {
  uuid: string;
  quattId: number;
  name: string;
  placements?: tSharedPlacement[];
};
export const sSharedTeam = z.object({
  uuid: z.uuid(),
  quattId: z.number(),
  name: z.string(),
  placements: z.lazy(()=> z.array(sSharedPlacement)).optional()
});


//---------------------------------------------GET---------------------------------------------//
export const sGetTeamsQuery = z.object({
  offset: z.coerce.number().default(0).optional(),
  limit: z.coerce.number().default(100).optional(),
  quattId: z.coerce.number().optional()
});
export type tGetTeamsQuery = z.infer<typeof sGetTeamsQuery>;
//---------------------------------------------------------------------------------------------//


// GET
export const sGetTeamsByQuattIdQuery = z.object({
  quattId: z.coerce.number(),
  withPlacements: z.stringbool().default(false),
  withYears: z.stringbool().default(false)
});
export type tGetTeamsByQuattIdQuery = z.infer<typeof sGetTeamsByQuattIdQuery>;

export const sGetTeamsByUuidParams = z.object({
  uuid: z.uuid()
});
export type tGetTeamsByUuidParams = z.infer<typeof sGetTeamsByUuidParams>;

// POST
export const sCreateTeamsBody = z.object({
  quattId: z.number(),
  name: z.string(),
  withPlacements: z.boolean().default(false)
});
export type tCreateTeamsBody = z.infer<typeof sCreateTeamsBody>;


// PATCH
export const sPatchTeamsByUuidParams = z.object({
  uuid: z.uuid()
});
export type tPatchTeamsByUuidParams = z.infer<typeof sPatchTeamsByUuidParams>;

export const sPatchTeamsByUuidBody = z.object({
  newName: z.string(),
  newQuattId: z.number()
});
export type tPatchTeamsByUuidBody = z.infer<typeof sPatchTeamsByUuidBody>;

// DELETE
export const sDeleteTeamsByUuidParams = z.object({
  uuid: z.uuid()
});
export type tDeleteTeamsByUuidParams = z.infer<typeof sDeleteTeamsByUuidParams>;
