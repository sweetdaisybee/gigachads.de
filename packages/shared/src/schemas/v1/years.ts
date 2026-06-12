import { sPlacement, sSharedPlacement, tPlacement, tSharedPlacement } from "@schemasV1/placements.js";
import z from "zod"

//---------------------------------------------Example-----------------------------------------//
export const exampleYear = {
  id: 0,
  uuid: crypto.randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 2024,
};
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Schema------------------------------------------//
export type tYear = {
  id: number,
  uuid: string,
  createdAt: Date,
  updatedAt: Date,
  name: number,
  placements?: tPlacement[]
};
export const sYear: z.ZodObject = z.object({
  id: z.number(),
  uuid: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.number(),
  placements: z.lazy(() => z.array(sPlacement))
});
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Example-----------------------------------------//
export const exampleSharedYear = {
  uuid: crypto.randomUUID(),
  name: 2024
};
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Schema------------------------------------------//
export type tSharedYear = {
  uuid: string,
  name: number,
  placements?: tSharedPlacement[]
};
export const sSharedYear: z.ZodObject = z.object({
  uuid: z.uuid(),
  name: z.number(),
  placements: z.lazy(() => z.array(sSharedPlacement)).optional()
});
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetYearsQuery = z.object({
  offset: z.coerce.number().default(0).optional(),
  limit: z.coerce.number().default(100).optional(),
  withPlacements: z.stringbool().default(false).optional()
});
export type tGetYearsQuery = z.infer<typeof sGetYearsQuery>;
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetYearsByUuidParams = z.object({
  uuid: z.uuid()
});
export type tGetYearsByUuidParams = z.infer<typeof sGetYearsByUuidParams>;
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
export const sGetYearsByNameParams = z.object({
  name: z.number()
});
export type tGetYearsByNameParams = z.infer<typeof sGetYearsByNameParams>;
//---------------------------------------------------------------------------------------------//


//--------------------------------------------POST---------------------------------------------//
export const sCreateYearsBody = z.object({
  name: z.number()
});
export type tCreateYearsBody = z.infer<typeof sCreateYearsBody>;
//---------------------------------------------------------------------------------------------//



//-------------------------------------------PATCH---------------------------------------------//
export const sPatchYearsByUuidParams = z.object({
  uuid: z.uuid()
});
export type tPatchYearsByUuidParams = z.infer<typeof sPatchYearsByUuidParams>;
//---------------------------------------------------------------------------------------------//


//-------------------------------------------PATCH---------------------------------------------//
export const sPatchYearsByUuidBody = z.object({
  newName: z.number()
});
export type tPatchYearsByUuidBody = z.infer<typeof sPatchYearsByUuidBody>;
//---------------------------------------------------------------------------------------------//


//------------------------------------------DELETE---------------------------------------------//
export const sDeleteYearsByUuidParams = z.object({
  uuid: z.uuid()
});
export type tDeleteYearsByUuidParams = z.infer<typeof sDeleteYearsByUuidParams>;
//---------------------------------------------------------------------------------------------//
