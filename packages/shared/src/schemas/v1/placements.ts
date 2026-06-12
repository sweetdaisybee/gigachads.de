import { sSharedTeam, sSharedYear, sTeam, sYear, tSharedTeam, tSharedYear, tTeam, tYear } from "@schemasV1/index.js";
import z from "zod";

//---------------------------------------------Example-----------------------------------------//
export const examplePlacement = {
  id: 0,
  uuid: crypto.randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  rank: 1,
  teamId: 0,
  yearId: 0
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export type tPlacement = {
  id: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  rank: number;
  teamId: number;
  team?: tTeam;
  yearId: number;
  year?: tYear;
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export const sPlacement: z.ZodObject = z.object({
  id: z.number(),
  uuid: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  rank: z.number(),
  teamId: z.number(),
  team: z.lazy(() => sTeam).nullish(),
  yearId: z.number(),
  year: z.lazy(() => sYear).nullish()
});
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Example-----------------------------------------//
export const exampleSharedPlacement = {
  uuid: crypto.randomUUID(),
  rank: 1
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export type tSharedPlacement = {
  uuid: string;
  rank: number;
  team?: tSharedTeam;
  year?: tSharedYear;
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export const sSharedPlacement: z.ZodObject = z.object({
  uuid: z.uuid(),
  rank: z.number(),
  team: z.lazy(() => sSharedTeam).nullish(),
  year: z.lazy(() => sSharedYear).nullish()
});
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
/**
 * Query schema for retrieving placements.
 *
 * Used in GET /api/v1/placements to validate and parse query.
 *
 * @constant {z.ZodObject} sGetPlacementsQuery
 *
 * @property {number} [offset=0] - Number of records to skip.
 * @property {number} [limit=100] - Maximum number of records to return.
 * @property {boolean} [withYears=false] - Whether to include related year data.
 * @property {boolean} [withTeams=false] - Whether to include related team data.
 * @property {string} [teamUuid] - .
 * @property {string} [yearUuid] - .
 */
export const sGetPlacementsQuery = z.object({
  offset: z.coerce.number().default(0).optional(),
  limit: z.coerce.number().default(100).optional(),
  withYears: z.stringbool().default(false).optional(),
  withTeams: z.stringbool().default(false).optional(),
  teamUuid: z.uuid().optional(),
  yearUuid: z.uuid().optional()
});
/**
 * Query type for retrieving placements.
 *
 * @property {number} [offset=0] - Number of records to skip.
 * @property {number} [limit=100] - Maximum number of records to return.
 * @property {boolean} [withYears=false] - Whether to include related year data.
 * @property {boolean} [withTeams=false] - Whether to include related team data.
 * @property {string} [teamUuid] - .
 * @property {string} [yearUuid] - .
 */
export type tGetPlacementsQuery = z.infer<typeof sGetPlacementsQuery>;
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
/**
 * Parameters schema for retrieving a placement by UUID.
 *
 * Used in GET /api/v1/placements/:uuid to validate and parse parameters.
 *
 * @constant {z.ZodObject} sGetPlacementsByUuidParams
 *
 * @property {string} uuid
 */
export const sGetPlacementsByUuidParams = z.object({
  uuid: z.uuid()
});
/**
 * Parameters type for retrieving a placement by UUID.
 *
 * @type
 *
 * @property {string} uuid
 */
export type tGetPlacementsByUuidParams = z.infer<typeof sGetPlacementsByUuidParams>;
//---------------------------------------------------------------------------------------------//

//--------------------------------------------POST---------------------------------------------//
/**
 * Body schema for creating a new placement.
 *
 * Used in POST /api/v1/placements to validate and parse body.
 *
 * @constant {z.ZodObject} sCreatePlacementsBody
 *
 * @property {number} rank
 * @property {string} teamUuid
 * @property {string} yearUuid
 */
export const sCreatePlacementsBody = z.object({
  rank: z.number(),
  teamUuid: z.uuid(),
  yearUuid: z.uuid()
});
/**
 * Body type for creating a new placement.
 *
 * @type
 *
 * @property {number} rank
 * @property {string} teamUuid
 * @property {string} yearUuid
 */
export type tCreatePlacementsBody = z.infer<typeof sCreatePlacementsBody>;
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Parameters schema for updating a placement.
 *
 * Used in PATCH /api/v1/placements/:uuid to validate and parse parameters.
 *
 * @constant {z.ZodObject} sPatchPlacementsByUuidParams
 *
 * @property {string} uuid
 */
export const sPatchPlacementsByUuidParams = z.object({
  uuid: z.uuid()
});
/**
 * Parameters type for updating a placement.
 *
 * Used in PATCH /api/v1/placements/:uuid to validate and parse parameters.
 *
 * @type
 *
 * @property {string} uuid
 */
export type tPatchPlacementsByUuidParams = z.infer<typeof sPatchPlacementsByUuidParams>;
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Body schema for updating a placement.
 *
 * Used in PATCH /api/v1/placements/:uuid to validate and parse body.
 *
 * @constant {z.ZodObject} sPatchPlacementsByUuidBody
 *
 * @property {number} newRank
 */
export const sPatchPlacementsByUuidBody = z.object({
  newRank: z.number()
});
/**
 * Body schema for updating a placement.
 *
 * Used in PATCH /api/v1/placements/:uuid to validate and parse body.
 *
 * @type
 *
 * @property {number} newRank
 */
export type tPatchPlacementsByUuidBody = z.infer<typeof sPatchPlacementsByUuidBody>;
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Parameters schema for deleting a placement.
 *
 * Used in DELETE /api/v1/placements/:uuid to validate and parse parameters.
 *
 * @constant {z.ZodObject} sDeletePlacementsByUuidParams
 *
 * @property {string} uuid
 */
export const sDeletePlacementsByUuidParams = z.object({
  uuid: z.uuid()
});
/**
 * Parameters schema for deleting a placement.
 *
 * Used in DELETE /api/v1/placements/:uuid to validate and parse parameters.
 *
 * @type
 *
 * @property {string} uuid
 */
export type tDeletePlacementsByUuidParams = z.infer<typeof sDeletePlacementsByUuidParams>;
//---------------------------------------------------------------------------------------------//
