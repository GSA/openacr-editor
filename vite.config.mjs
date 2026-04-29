import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import yaml from "@modyfi/vite-plugin-yaml";

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [
    yaml(),
    svelte({
      onwarn(warning, handler) {
        if (warning.filename?.includes("node_modules/svelte-select")) {
          return;
        }

        handler(warning);
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 900,
  },
  server: {
    host: "0.0.0.0",
    port: 10001,
  },
  preview: {
    host: "0.0.0.0",
    port: 10001,
    strictPort: true,
  },
});
