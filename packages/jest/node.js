/**
 * @type {import("jest").Config}
 */
const config = {
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  verbose: true
};

export default config;