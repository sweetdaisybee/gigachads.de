import { logger } from "@index";
import { HTTPMethods } from "fastify"

export const fetchJson = async <T> (
  method: HTTPMethods,
  path: string,
  body?: any
): Promise<T> => {
  logger.debug(`Sending ${method} API request to https://api.quattfo.de${path}`);
  const request = await fetch(`https://api.quattfo.de${path}`, {
    method: method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: body
  });
  if (!request.ok) {
    throw new Error("API Request error")
  };
  const data = await request.json();
  logger.trace(`Reply data: ${JSON.stringify(data)}`);
  return data as T;
};
