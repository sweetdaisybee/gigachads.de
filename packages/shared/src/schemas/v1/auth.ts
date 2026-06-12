import z from "zod";

//--------------------------------------------POST---------------------------------------------//
/**
 * Body schema for authenticating to the server.
 * 
 * Used in POST /api/v1/auth to validate and parse body.
 * 
 * @constant {z.ZodObject} sCreateAuthBody
 * 
 * @property {string} email
 * @property {string} password
 */
export const sCreateAuthBody = z.object({
  email: z.email(),
  password: z.string()
});
/**
 * Body type for authenticating to the server.
 * 
 * @type
 * 
 * @property {string} email
 * @property {string} password
 */
export type tCreateAuthBody = z.infer<typeof sCreateAuthBody>;
//---------------------------------------------------------------------------------------------//