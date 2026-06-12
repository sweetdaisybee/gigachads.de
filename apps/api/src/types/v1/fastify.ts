import z from "zod/v3";

const sFastifyInitCookieOpts = z.object({
  secret: z.string()
})

const sFastifyInitJwtOpts = z.object({
  secret: z.string(),
  cookieName: z.string()
});

const sFastifyInitCorsOpts = z.object({
  origin: z.string(),
  credentials: z.boolean(),
  methods: z.array(z.enum(["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"])),
  maxAge: z.number()
});

const sFastifyInitRedisOpts = z.object({
  enabled: z.boolean(),
  host: z.string(),
  password: z.string(),
  port: z.number(),
  family: z.enum(["4", "6"]).pipe(z.coerce.number())
});

export const sFastifyInitOpts = z.object({
  host: z.string(),
  port: z.number(),
  redis: sFastifyInitRedisOpts,
  cors: sFastifyInitCorsOpts,
  jwt: sFastifyInitJwtOpts,
  cookie: sFastifyInitCookieOpts
});

export type tFastifyInitCookieOpts = z.infer<typeof sFastifyInitCookieOpts>;
export type tFastifyInitJwtOpts = z.infer<typeof sFastifyInitJwtOpts>;
export type tFastifyInitCorsOpts = z.infer<typeof sFastifyInitCorsOpts>;
export type tFastifyInitRedisOpts = z.infer<typeof sFastifyInitRedisOpts>;
export type tFastifyInitOpts = z.infer<typeof sFastifyInitOpts>;
