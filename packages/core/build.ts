#!/usr/bin/env bun

import { generate } from "./src/index.js";
import path from "path";
import { $ } from "bun";

async function build() {
  console.log("Generating all.json...");

  const providersPath = path.join(import.meta.dir, "../../providers");
  const models = await generate(providersPath);
  
  const distPath = path.join(import.meta.dir, "dist");
  await $`rm -rf ${distPath}`;
  await $`mkdir -p ${distPath}`;
  const outputPath = path.join(distPath, "all.json");

  Bun.write(Bun.file(outputPath), JSON.stringify(models, null, 2));
  
  console.log(`✅ Generated all.json (${Object.keys(models).length} providers)`);
  
  const minifiedPath = path.join(distPath, "all.min.json");
  Bun.write(Bun.file(minifiedPath), JSON.stringify(models));
  console.log("✅ Generated all.min.json");
}

build().catch(console.error);