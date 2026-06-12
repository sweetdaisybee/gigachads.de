import z from "zod";

export const sReply = z.object({
  meta: z.object({
    statusCode: z.number(),
    status: z.enum([
      "Ok",
      "Created",
      "No Content",
      "Bad Request",
      "Not Found"
    ]),
    message: z.string()
  }),
  data: z.any()
})

export type tReply<T> = {
  meta: {
    statusCode: number
    status: string
    message: string
  },
  data: T
}