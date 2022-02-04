import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import yaml from "@rollup/plugin-yaml";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript";

const production = !process.env.ROLLUP_WATCH;
const buildEnv = process.env.NODE_ENV || "development";

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: `public/build/bundle.js`,
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: (css) => {
        css.write(`public/build/bundle.css`);
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: (importee) =>
        importee === "svelte" || importee.startsWith("svelte/"),
    }),
    typescript({ target: "es6" }),
    commonjs({
      extensions: [".js", ".ts"],
      transformMixedEsModules: true,
    }),
    json(),
    yaml(),
    babel({
      extensions: [".js", ".mjs", ".html", ".svelte"],
      runtimeHelpers: true,
      exclude: [
        "node_modules/@babel/**",
        "node_modules/core-js/**",
        "node_modules/@openacr/**",
        "node_modules/marked/**",
      ],
      presets: [
        [
          "@babel/preset-env",
          {
            // adapter to ensure IE 11 support
            useBuiltIns: "usage",
            corejs: 3,
          },
        ],
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        [
          "@babel/plugin-transform-runtime",
          {
            useESModules: true,
          },
        ],
      ],
    }),
    replace({
      __buildEnv__: buildEnv,
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production &&
      serve({
        contentBase: "public",
        historyApiFallback: true,
      }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production &&
      livereload({
        watch: "public",
      }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
};
