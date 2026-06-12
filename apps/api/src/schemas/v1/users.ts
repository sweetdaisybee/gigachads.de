import { exampleSharedUser, exampleUser, sCreateUsersBody, sGetUsersByUuidParams, sGetUsersByUuidQuery, sReply, sSharedUser } from "@gigachads.de/shared/schemas/v1";
import { FastifySchema } from "fastify";
import z from "zod";

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/users
 * 
 * @constant {FastifySchema} sGetUsers
 */
export const sGetUsers: FastifySchema = {
  tags: ["Users"],
  response: {
    200: sReply.extend({
      data: z.array(sSharedUser)
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved all users",
      },
      data: [exampleSharedUser]
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//


//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/users/:uuid
 * 
 * @constant {FastifySchema} sGetUsersByUuid
 */
export const sGetUsersByUuid: FastifySchema = {
  tags: ["Users"],
  params: sGetUsersByUuidParams,
  querystring: sGetUsersByUuidQuery,
  response: {
    200: sReply.extend({
      data: sSharedUser
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved user with UUID ${uuid}",
      },
      data: exampleSharedUser
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//--------------------------------------------POST---------------------------------------------//
/**
 * Fastify schema for POST /api/v1/users
 * 
 * @constant {FastifySchema} sPostUsers
 */
export const sPostUsers: FastifySchema = {
  tags: ["Users"],
  body: sCreateUsersBody,
  response: {
    201: sReply.extend({
      data: sSharedUser
    }).default({
      meta: {
        statusCode: 200,
        status: "Created",
        message: "Created user ${name}",
      },
      data: exampleSharedUser
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Fastify schema for DELETE /api/v1/users/:uuid
 * 
 * @constant {FastifySchema} sDeleteUsersByUuid
 */
export const sDeleteUsersByUuid: FastifySchema = {
  tags: ["Users"],
  response: {
    200: sReply.extend({
      data: sSharedUser
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Deleted user with UUID ${uuid}",
      },
      data: exampleSharedUser
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//
