import { examplePlacement, exampleSharedPlacement, sCreatePlacementsBody, sDeletePlacementsByUuidParams, sGetPlacementsByUuidParams, sGetPlacementsQuery, sPatchPlacementsByUuidBody, sPatchPlacementsByUuidParams, sReply, sSharedPlacement } from "@gigachads.de/shared/schemas/v1";
import { FastifySchema } from "fastify";
import z from "zod";

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/placements
 * 
 * @constant {FastifySchema} sGetPlacements
 */
export const sGetPlacements: FastifySchema = {
  tags: ["Placements"],
  querystring: sGetPlacementsQuery,
  response: {
    200: sReply.extend({
      data: z.array(sSharedPlacement)
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved all placements",
      },
      data: [exampleSharedPlacement]
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/placements/:uuid
 * 
 * @constant {FastifySchema} sGetPlacementsByUuid
 */
export const sGetPlacementsByUuid: FastifySchema = {
  tags: ["Placements"],
  params: sGetPlacementsByUuidParams,
  response: {
    200: sReply.extend({
      data: sSharedPlacement
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved placement with UUID ${uuid}",
      },
      data: exampleSharedPlacement
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//--------------------------------------------POST---------------------------------------------//
/**
 * Fastify schema for POST /api/v1/placements
 * 
 * @constant {FastifySchema} sPostPlacements
 */
export const sPostPlacements: FastifySchema = {
  tags: ["Placements"],
  body: sCreatePlacementsBody,
  response: {
    201: sReply.extend({
      data: sSharedPlacement
    }).default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: "Created placement ${uuid}",
      },
      data: exampleSharedPlacement
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Fastify schema for PATCH /api/v1/placements/:uuid
 * 
 * @constant {FastifySchema} sPatchPlacementsByUuid
 */
export const sPatchPlacementsByUuid: FastifySchema = {
  tags: ["Placements"],
  params: sPatchPlacementsByUuidParams,
  body: sPatchPlacementsByUuidBody,
  response: {
    200: sReply.extend({
      data: sSharedPlacement
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Patched placement with UUID ${uuid}",
      },
      data: exampleSharedPlacement
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Fastify schema for DELETE /api/v1/placements/:uuid
 * 
 * @constant {FastifySchema} sDeletePlacementsByUuid
 */
export const sDeletePlacementsByUuid: FastifySchema = {
  tags: ["Placements"],
  params: sDeletePlacementsByUuidParams,
  response: {
    200: sReply.extend({
      data: sSharedPlacement
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Deleted placement with UUID ${uuid}",
      },
      data: exampleSharedPlacement
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//
