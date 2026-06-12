import {
  ModelErrorBadRequest,
  ModelErrorConflict,
  ModelErrorInternalServerError,
  ModelErrorNotFound,
  ModelErrorUnauthorized
} from "@modelsV1/index.js";

export class FactoryErrors {
  public readonly createBadRequest = (
    message: string
  ): ModelErrorBadRequest => {
    return new ModelErrorBadRequest(message);
  };
  public readonly createUnauthorized = (
    message: string
  ): ModelErrorUnauthorized => {
    return new ModelErrorUnauthorized(message);
  };
  public readonly createNotFound = (
    message: string
  ): ModelErrorNotFound => {
    return new ModelErrorNotFound(message);
  };
  public readonly createConflict = (
    message: string
  ): ModelErrorConflict => {
    return new ModelErrorConflict(message);
  };
  public readonly createInternalServerError = (
    message: string
  ): ModelErrorInternalServerError => {
    return new ModelErrorInternalServerError(message);
  };
};
