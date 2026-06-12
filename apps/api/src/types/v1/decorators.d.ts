import "fastify";
import { tReply } from "@gigachads.de/shared/schemas/v1";

declare module "fastify" {
  interface FastifyReply {
    error(error: unknown): void;
    default<T>(tReply: tReply<T>): FastifyReply;
  }
}
