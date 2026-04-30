import sveltePlugin from "eslint-plugin-svelte";

const browserGlobals = {
  Blob: "readonly",
  DataTransfer: "readonly",
  Event: "readonly",
  FileReader: "readonly",
  URL: "readonly",
  confirm: "readonly",
  console: "readonly",
  document: "readonly",
  history: "readonly",
  location: "readonly",
  navigator: "readonly",
  window: "readonly",
};

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "public/build/**",
    ],
  },
  ...sveltePlugin.configs["flat/recommended"],
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: browserGlobals,
    },
  },
];
