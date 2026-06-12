export class ModelErrorApi extends Error {
  public statusCode: number;
  public status: string;
  constructor(
    statusCode: number,
    status: string,
    message: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
  };
};

export class ModelErrorBadRequest extends ModelErrorApi {
  constructor(message: string) {
    super(400, "Bad Request", message);
  };
};

export class ModelErrorUnauthorized extends ModelErrorApi {
  constructor(message: string) {
    super(401, "Unauthorized", message);
  };
};

export class ModelErrorNotFound extends ModelErrorApi {
  constructor(message: string) {
    super(404, "Not Found", message);
  };
};

export class ModelErrorConflict extends ModelErrorApi {
  constructor(message: string) {
    super(409, "Conflict", message);
  };
};

export class ModelErrorInternalServerError extends ModelErrorApi {
  constructor(message: string) {
    super(500, "Internal Server Error", message);
  };
};

