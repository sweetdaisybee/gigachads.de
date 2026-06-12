import z from "zod";

export const schemaEnv = z.object({
  DATABASE_URL: z.string()
});

export const env = schemaEnv.parse(process.env);
