import z from "zod/v3";

export const sPinoInitOpts = z.object({
  nodeEnv: z.enum(["dev", "prod"]),
  enabled: z.boolean(),
  level: z.enum(["fatal", "error", "warn", "info", "debug", "trace"])
});

export type tPinoInitOpts= z.infer<typeof sPinoInitOpts>;
