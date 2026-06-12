import z from "zod";

//---------------------------------------------Example-----------------------------------------//
export const exampleSponsor = {
  id: 0,
  uuid: crypto.randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Example Sponsor",
  emoji: "❤",
  uri: "https://example.com",
  past: false
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export type tSponsor = {
  id: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  emoji: string;
  uri: string;
  past: boolean;
}
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export const sSponsor = z.object({
  id: z.number(),
  uuid: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  emoji: z.string(),
  uri: z.string(),
  past: z.boolean().default(false)
});
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Example-----------------------------------------//
export const exampleSharedSponsor = {
  uuid: crypto.randomUUID(),
  name: "Example Sponsor",
  emoji: "❤",
  uri: "https://example.com"
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export type tSharedSponsor = {
  uuid: string;
  name: string;
  emoji: string;
  uri: string;
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------Schema------------------------------------------//
export const sSharedSponsor = z.object({
  uuid: z.uuid(),
  name: z.string(),
  emoji: z.string(),
  uri: z.string()
});
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
/**
 * Parameters schema for retrieving a sponsor by UUID.
 *
 * Used in GET /api/v1/sponsors/:uuid to validate and parse parameters.
 *
 * @constant {z.ZodObject} sGetSponsorsByUuidParams
 *
 * @property {string} uuid
 */
export const sGetSponsorsByUuidParams = z.object({
  uuid: z.uuid()
});
/**
 * Parameters type for retrieving a sponsor by UUID.
 *
 * @type
 *
 * @property {string} uuid
 */
export type tGetSponsorsByUuidParams = z.infer<typeof sGetSponsorsByUuidParams>;
//---------------------------------------------------------------------------------------------//

//--------------------------------------------POST---------------------------------------------//
/**
 * Body schema for creating a new sponsor.
 *
 * Used in POST /api/v1/sponsors to validate and parse body.
 *
 * @constant {z.ZodObject} sCreateSponsorsBody
 *
 * @property {string} name
 * @property {string} emoji
 * @property {string} uri
 * @property {boolean} past
 */
export const sCreateSponsorsBody = z.object({
  name: z.string(),
  emoji: z.string(),
  uri: z.string(),
  past: z.boolean()
});
/**
 * Body type for creating a new sponsor.
 *
 * @type
 *
 * @property {string} name
 * @property {string} emoji
 * @property {string} uri
 * @property {boolean} past
 */
export type tCreateSponsorsBody = z.infer<typeof sCreateSponsorsBody>;
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Parameters schema for updating a sponsor.
 *
 * Used in PATCH /api/v1/sponsors/:uuid to validate and parse parameters.
 *
 * @constant {z.ZodObject} sPatchSponsorsByUuidParams
 *
 * @property {string} uuid
 */
export const sPatchSponsorsByUuidParams = z.object({
  uuid: z.uuid(),
});
/**
 * Parameters type for updating a sponsor.
 *
 * Used in PATCH /api/v1/sponsors/:uuid to validate and parse parameters.
 *
 * @type
 *
 * @property {string} uuid
 */
export type tPatchSponsorsByUuidParams = z.infer<typeof sPatchSponsorsByUuidParams>;
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Body schema for updating a sponsor.
 *
 * Used in PATCH /api/v1/sponsors/:uuid to validate and parse parameters.
 *
 * @constant {z.ZodObject} sPatchSponsorsByUuidBody
 *
 * @property {string} newName
 * @property {string} newEmoji
 * @property {string} newUri
 * @property {boolean} newPast
 */
export const sPatchSponsorsByUuidBody = z.object({
  newName: z.string().optional(),
  newEmoji: z.string().optional(),
  newUri: z.string().optional(),
  newPast: z.boolean().optional()
});
/**
 * Body type for creating a new sponsor.
 *
 * Used in PATCH /api/v1/sponsors/:uuid to validate and parse body.
 *
 * @type
 *
 * @property {string} newName
 * @property {string} newEmoji
 * @property {string} newUri
 * @property {boolean} newPast
 */
export type tPatchSponsorsByUuidBody = z.infer<typeof sPatchSponsorsByUuidBody>;
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Parameters schema for deleting a sponsor.
 *
 * Used in DELETE /api/v1/sponsors/:uuid to validate and parse parameters.
 *
 * @constant {z.ZodObject} sDeleteSponsorsByUuidParams
 *
 * @property {string} uuid
 */
export const sDeleteSponsorsByUuidParams = z.object({
  uuid: z.uuid()
});
/**
 * Parameters schema for deleting a sponsor.
 *
 * Used in DELETE /api/v1/sponsors/:uuid to validate and parse parameters.
 *
 * @type
 *
 * @property {string} uuid
 */
export type tDeleteSponsorsByUuidParams = z.infer<typeof sDeleteSponsorsByUuidParams>;
//---------------------------------------------------------------------------------------------//
