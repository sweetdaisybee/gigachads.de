import { sPassword, tPassword } from "@schemasV1/passwords.js";
import z from "zod"

//---------------------------------------------Example-----------------------------------------//
export const exampleUser = {
  id: 0,
  uuid: crypto.randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Gigachad",
  email: "contact@gigachads.de"
}
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Schema------------------------------------------//
export type tUser = {
  id: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password?: tPassword | null;
};
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Schema------------------------------------------//
export const sUser: z.ZodObject = z.object({
  id: z.number(),
  uuid: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  email: z.email(),
  password: z.lazy(() => sPassword).optional()
});
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Example-----------------------------------------//
export const exampleSharedUser = {
  uuid: crypto.randomUUID(),
  name: "Gigachad",
  email: "contact@gigachads.de"
};
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Schema------------------------------------------//
export type tSharedUser = {
  uuid: string;
  name: string;
  email: string;
};
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Schema------------------------------------------//
export const sSharedUser = z.object({
  uuid: z.uuid(),
  name: z.string(),
  email: z.email()
});
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetUsersByUuidParams = z.object({
  uuid: z.uuid()
});
export type tGetUsersByUuidParams = z.infer<typeof sGetUsersByUuidParams>;
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetUsersByUuidQuery = z.object({
  withPassword: z.stringbool().default(false)
});
export type tGetUsersByUuidQuery = z.infer<typeof sGetUsersByUuidQuery>;
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetUsersByNameParams = z.object({
  name: z.string()
});
export type tGetUsersByNameParams = z.infer<typeof sGetUsersByNameParams>;
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetUsersByNameQuery = z.object({
  withPassword: z.stringbool().default(false)
});
export type tGetUsersByNameQuery = z.infer<typeof sGetUsersByNameQuery>;
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetUsersByEmailParams = z.object({
  email: z.string()
});
export type tGetUsersByEmailParams = z.infer<typeof sGetUsersByEmailParams>;
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
export const sGetUsersByEmailQuery = z.object({
  withPassword: z.stringbool().default(false)
});
export type tGetUsersByEmailQuery = z.infer<typeof sGetUsersByEmailQuery>;
//---------------------------------------------------------------------------------------------//


//--------------------------------------------POST---------------------------------------------//
export const sCreateUsersBody = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string()
});
export type tCreateUsersBody = z.infer<typeof sCreateUsersBody>;
//---------------------------------------------------------------------------------------------//


//------------------------------------------DELETE---------------------------------------------//
export const sDeleteUsersByUuidParams = z.object({
  uuid: z.uuid()
});
export type tDeleteUsersByUuidParams = z.infer<typeof sDeleteUsersByUuidParams>;
//---------------------------------------------------------------------------------------------//
