import { exampleSharedYear, exampleYear, sCreateYearsBody, sDeleteYearsByUuidParams, sGetYearsByUuidParams, sPatchYearsByUuidBody, sPatchYearsByUuidParams, sReply, sSharedYear } from "@gigachads.de/shared/schemas/v1";
import { FastifySchema } from "fastify";
import z from "zod";

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/years
 * 
 * @constant {FastifySchema} sGetYears
 */
export const sGetYears: FastifySchema = {
  tags: ["Years"],
  response: {
    200: sReply.extend({
      data: z.array(sSharedYear)
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved all years",
      },
      data: [exampleYear]
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------GET---------------------------------------------//
/**
 * Fastify schema for GET /api/v1/years/:uuid
 * 
 * @constant {FastifySchema} sGetYearsByUuid
 */
export const sGetYearsByUuid: FastifySchema = {
  tags: ["Years"],
  params: sGetYearsByUuidParams,
  response: {
    200: sReply.extend({
      data: sSharedYear
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Retrieved year with UUID ${uuid}",
      },
      data: exampleSharedYear
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------//
/**
 * Fastify schema for POST /api/v1/years
 * 
 * @constant {FastifySchema} sPostYears
 */
export const sPostYears: FastifySchema = {
  tags: ["Years"],
  body: sCreateYearsBody,
  response: {
    201: sReply.extend({
      data: sSharedYear
    }).default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: "Created year ${name}",
      },
      data: exampleYear
    }).describe("Successfull reply"),
  }
}
//---------------------------------------------------------------------------------------------//

//-------------------------------------------PATCH---------------------------------------------//
/**
 * Fastify schema for PATCH /api/v1/years/:uuid
 * 
 * @constant {FastifySchema} sPatchYearsByUuid
 */
export const sPatchYearsByUuid: FastifySchema = {
  tags: ["Years"],
  params: sPatchYearsByUuidParams,
  body: sPatchYearsByUuidBody,
  response: {
    200: sReply.extend({
      data: sSharedYear
    }).default({
      meta: {
        statusCode: 200,
        status: "Created",
        message: "Pachted year with UUID ${uuid}",
      },
      data: exampleYear
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//

//------------------------------------------DELETE---------------------------------------------//
/**
 * Fastify schema for DELETE /api/v1/years/:uuid
 * 
 * @constant {FastifySchema} sDeleteYearsByUuid
 */
export const sDeleteYearsByUuid: FastifySchema = {
  tags: ["Years"],
  params: sDeleteYearsByUuidParams,
  response: {
    200: sReply.extend({
      data: sSharedYear
    }).default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: "Deleted year with UUID ${uuid}",
      },
      data: exampleYear
    }).describe("Successfull reply"),
  }
};
//---------------------------------------------------------------------------------------------//
