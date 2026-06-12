import {
  exampleSponsor,
  sCreateSponsorsBody,
  sGetSponsorsByUuidParams,
  sPatchSponsorsByUuidBody,
  sPatchSponsorsByUuidParams,
  sReply,
  sSharedSponsor
} from "@gigachads.de/shared/schemas/v1";
import { FastifySchema } from "fastify";
import z from "zod";

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/sponsors
 * 
 * @constant {FastifySchema} sGetSponsors
 */
export const sGetSponsors: FastifySchema = {
  tags: ["Sponsors"],
  response: {
    200: sReply.extend({
      data: z.array(sSharedSponsor)
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved all sponsors",
      },
      data: [exampleSponsor]
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/sponsors/:uuid
 * 
 * @constant {FastifySchema} sGetSponsorsByUuid
 */
export const sGetSponsorsByUuid: FastifySchema = {
  tags: ["Sponsors"],
  params: sGetSponsorsByUuidParams,
  response: {
    200: sReply.extend({
      data: sSharedSponsor
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved sponsor with UUID ${uuid}",
      },
      data: exampleSponsor
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//--------------------------------------------POST---------------------------------------------//
/**
 * Fastify schema for POST /api/v1/sponsors
 * 
 * @constant {FastifySchema} sPostSponsors
 */
export const sPostSponsors: FastifySchema = {
  tags: ["Sponsors"],
  body: sCreateSponsorsBody,
  response: {
    201: sReply.extend({
      data: sSharedSponsor
    }).default({
      meta: {
        statusCode: 200,
        status: "Created",
        message: "Created sponsor ${name}",
      },
      data: exampleSponsor
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Fastify schema for PATCH /api/v1/sponsors/:uuid
 * 
 * @constant {FastifySchema} sPatchSponsorsByUuid
 */
export const sPatchSponsorsByUuid: FastifySchema = {
  tags: ["Sponsors"],
  params: sPatchSponsorsByUuidParams,
  body: sPatchSponsorsByUuidBody,
  response: {
    201: sReply.extend({
      data: sSharedSponsor
    }).default({
      meta: {
        statusCode: 200,
        status: "Created",
        message: "Patched sponsor with UUID ${uuid}",
      },
      data: exampleSponsor
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Fastify schema for DELETE /api/v1/sponsors/:uuid
 * 
 * @constant {FastifySchema} sDeleteSponsors
 */
export const sDeleteSponsors: FastifySchema = {
  tags: ["Sponsors"],
  response: {
    200: sReply.extend({
      data: sSharedSponsor
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Delted sponsor with UUID ${uuid}",
      },
      data: exampleSponsor
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//
