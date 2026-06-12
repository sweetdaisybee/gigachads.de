import { exampleSharedTeam, sCreateTeamsBody, sDeleteTeamsByUuidParams, sGetTeamsByQuattIdQuery, sGetTeamsQuery, sPatchTeamsByUuidBody, sPatchTeamsByUuidParams, sReply, sSharedTeam } from "@gigachads.de/shared/schemas/v1";
import { FastifySchema } from "fastify";
import z from "zod";

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/teams
 * 
 * @constant {FastifySchema} sGetTeams
 */
export const sGetTeams: FastifySchema = {
  tags: ["Teams"],
  querystring: sGetTeamsQuery,
  response: {
    200: sReply.extend({
      data: z.array(sSharedTeam)
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved all teams",
      },
      data: [exampleSharedTeam]
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/teams/:quattId
 * 
 * @constant {FastifySchema} sGetTeamsByQuattid
 */
export const sGetTeamsByQuattid: FastifySchema = {
  tags: ["Teams"],
  querystring: sGetTeamsByQuattIdQuery,
  response: {
    200: sReply.extend({
      data: sSharedTeam
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved team with QuattFo ID ${quattId}",
      },
      data: exampleSharedTeam
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//--------------------------------------------POST---------------------------------------------//
/**
 * Fastify schema for POST /api/v1/teams
 * 
 * @constant {FastifySchema} sPostTeams
 */
export const sPostTeams: FastifySchema = {
  tags: ["Teams"],
  body: sCreateTeamsBody,
  response: {
    201: sReply.extend({
      data: sSharedTeam
    }).default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: "Created team ${name}",
      },
      data: exampleSharedTeam
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Fastify schema for PATCH /api/v1/teams/:uuid
 * 
 * @constant {FastifySchema} sPatchTeamsByUuid
 */
export const sPatchTeamsByUuid: FastifySchema = {
  tags: ["Teams"],
  params: sPatchTeamsByUuidParams,
  body: sPatchTeamsByUuidBody,
  response: {
    200: sReply.extend({
      data: sSharedTeam
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Patched team with UUID ${uuid}",
      },
      data: exampleSharedTeam
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Fastify schema for DELETE /api/v1/teams/:uuid
 * 
 * @constant {FastifySchema} sDeleteTeamsByUuid
 */
export const sDeleteTeamsByUuid: FastifySchema = {
  tags: ["Teams"],
  params: sDeleteTeamsByUuidParams,
  response: {
    200: sReply.extend({
      data: sSharedTeam
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Deleted team with UUID ${uuid}",
      },
      data: exampleSharedTeam
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//
