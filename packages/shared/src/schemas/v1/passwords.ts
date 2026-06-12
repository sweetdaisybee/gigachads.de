import { sUser, tUser } from "@schemasV1/users.js";
import z from "zod";

//---------------------------------------------Schema------------------------------------------//
export type tPassword = {
  id: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  hash: string;
  userId: number;
  user?: tUser | null;
};
//---------------------------------------------------------------------------------------------//


//---------------------------------------------Schema------------------------------------------//
export const sPassword = z.object({
  id: z.number(),
  uuid: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  hash: z.string(),
  userId: z.number(),
  user: z.lazy(() => sUser).optional()
});
//---------------------------------------------------------------------------------------------//
