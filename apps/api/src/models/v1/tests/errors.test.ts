import { ModelErrorApi } from "../errors.js"

describe("ApiError", () => {
  it("should throw an ApiError with the correct message", () => {
    const throwError = () => {
      throw new ModelErrorApi(400, "Bad Request", "API doesn't work :(");
    };
    expect(throwError).toThrow(ModelErrorApi)
    expect(throwError).toThrow("API doesnt' work :(")
  });
  it("should have a proper name and message", () => {
    const error = new ModelErrorApi(400, "Bad Request", "API doesn't work :(");
    expect(error).toBeInstanceOf(ModelErrorApi);
    expect(error.name).toBe("ApiError");
    expect(error.message).toBe("API doesnt' work :(");
  });
});
