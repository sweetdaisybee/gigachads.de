import { sCreateAuthBody, sReply } from "@gigachads.de/shared/schemas/v1";
import { FastifySchema } from "fastify";
import z from "zod";

//--------------------------------------------POST---------------------------------------------//
/**
 * Fastify schema for POST /api/v1/auth
 * 
 * @constant {FastifySchema} sPostAuth
 */
export const sPostAuth: FastifySchema = {
  tags: ["Auth"],
  body: sCreateAuthBody,
  response: {
    201: sReply.extend({
      data: z.null()
    }).default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: "Logged in",
      },
      data: null
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Fastify schema for DELETE /api/v1/auth
 * 
 * @constant {FastifySchema} sDeleteAuth
 */
export const sDeleteAuth: FastifySchema = {
  tags: ["Auth"],
  response: {
    200: sReply.extend({
      data: z.null()
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Logged out",
      },
      data: null
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//
