import { mkdir, copyFile } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("src/calculator.js", "dist/calculator.js");
console.log("Build completed");
