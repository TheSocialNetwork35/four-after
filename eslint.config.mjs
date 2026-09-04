import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import ts from "typescript-eslint";
import globals from "globals";
export default defineConfig(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "output/**",
      "scripts/cloudflare-project.mjs",
    ],
  },
  {
    files: ["src/**/*.ts"],
    extends: [js.configs.recommended, ...ts.configs.recommended],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["scripts/*.mjs"],
    ...js.configs.recommended,
    languageOptions: { globals: globals.node },
  },
);
