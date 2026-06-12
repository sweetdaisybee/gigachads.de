import turbo from "eslint-plugin-turbo";
import ts from "typescript-eslint";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config"

/** @type {import("eslint").Linter.Config} */
const reactConfig = defineConfig([
  {
    ignores: ["node_modules/*", "dist/*", ".turbo", ".tsbuildinfo", "**/*.test*"],
    files: ["**/*.ts", "**/*.js", "**/*.tsx", "**/*.jsx"],
    languageOptions: {
      parser: ts.parser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      prettier: prettierPlugin,
      turbo: turbo,
      typescript: ts.plugin,
      react: react
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...turbo.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "prettier/prettier": "warn",
    }
  }
]);

export default reactConfig;
