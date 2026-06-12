import config from "@gigachads.de/jest/node"

config.moduleNameMapper = {
  ...config.moduleNameMapper,
  "@index": "<rootDir>/src/index.ts",
  "@configs": "<rootDir>/src/configs/index.ts",
  "@utils": "<rootDir>/src/utils/index.ts",
  "@modulesV1": "<rootDir>/src/modules/v1/index.ts",
  "@middlewaresV1": "<rootDir>/src/middlewares/v1/index.ts",
  "@typesV1": "<rootDir>/src/types/v1/index.ts"
};

export default config;
