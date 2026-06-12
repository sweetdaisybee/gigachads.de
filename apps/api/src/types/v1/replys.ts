import z from "zod";
import { sQuattYear, tQuattYear } from "./index.js";

export const sQuattReply = z.object({
  status: z.enum(["success", "error"]),
  year: sQuattYear,
  object: z.array(z.any())
});

export type tQuattReply<T> = {
  status: string;
  year: tQuattYear,
  object: T
};
