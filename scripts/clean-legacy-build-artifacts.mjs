import { rm } from "node:fs/promises";

const stalePaths = ["public/build", "public/index.html"];

await Promise.all(
  stalePaths.map(async (target) => {
    await rm(target, { force: true, recursive: true });
  }),
);
