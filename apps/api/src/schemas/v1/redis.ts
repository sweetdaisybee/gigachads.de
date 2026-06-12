import { sReply } from "@gigachads.de/shared/schemas/v1";
import { FastifySchema } from "fastify";
import z from "zod";

//------------------------------------------DELETE---------------------------------------------//
/**
 * Fastify schema for DELETE /api/v1/redis
 * 
 * @constant {FastifySchema} sDeleteRedis
 */
export const sDeleteRedis: FastifySchema = {
  tags: ["Redis"],
  response: {
    200: sReply.extend({
      data: z.boolean()
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Flushed redis",
      },
      data: true
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//
