import { tPinoInitOpts } from "@typesV1/pino.js";
import pino, { Logger, LoggerOptions } from "pino";

export const initPino = async (
  opts: tPinoInitOpts
): Promise<Logger> => {
  const pinoConfig: LoggerOptions = {
    enabled: opts.enabled,
    level: opts.level
  };
  if (opts.nodeEnv === "dev") {
    pinoConfig.transport = {
      target: "pino-pretty",
      options: {
        colorize: true
      }
    }
  }
  const logger = pino.pino(pinoConfig);
  logger.debug("Pino initialized");
  return logger;
};
