import turbo from "eslint-plugin-turbo";
import ts from "typescript-eslint";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config"

/** @type {import("eslint").Linter.Config} */
const nodeConfig = defineConfig([
  {
    ignores: ["node_modules/*", "dist/*", ".turbo", ".tsbuildinfo", "**/*.test*"],
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: ts.parser,
      sourceType: "module"
    },
    plugins: {
      prettier: prettierPlugin,
      turbo: turbo,
      typescript: ts.plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...turbo.configs.recommended.rules,
      "prettier/prettier": "warn",
    }
  }
]);

export default nodeConfig;
