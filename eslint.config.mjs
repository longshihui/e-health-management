import colorlessConfig from "@colorless/eslint-config";
import globals from "globals";

export default [
  {
    ignores: ["dist", "dist-electron", "release", "**/*.d.ts", "coverage"],
  },
  ...colorlessConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  },
];
