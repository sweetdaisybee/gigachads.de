import { FactoryErrors } from "@factoriesV1/index.js";
import { logger } from "@index";
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";

export class MiddlewareAuth {
  private readonly factErrors: FactoryErrors;
  constructor() {
    this.factErrors = new FactoryErrors();
  }
  //---------------------------------------------------------------------------------------------//
  public readonly verify = (): preHandlerHookHandler => {
    return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
      try {
        await request.jwtVerify();
      } catch {
        const error = this.factErrors.createUnauthorized(
          "Please authorize to the server"
        );
        throw error;
      }
    };
  };
};
