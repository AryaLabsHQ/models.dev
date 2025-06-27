#!/usr/bin/env bun

import { generate } from "./src/index.js";
import path from "path";
import { $ } from "bun";

async function build() {
  console.log("Generating models.json...");

  const providersPath = path.join(import.meta.dir, "../../providers");
  const models = await generate(providersPath);
  
  const distPath = path.join(import.meta.dir, "dist");
  await $`rm -rf ${distPath}`;
  await $`mkdir -p ${distPath}`;
  const outputPath = path.join(distPath, "models.json");

  Bun.write(Bun.file(outputPath), JSON.stringify(models, null, 2));
  
  console.log(`✅ Generated models.json (${Object.keys(models).length} providers)`);
  
  const minifiedPath = path.join(distPath, "models.min.json");
  Bun.write(Bun.file(minifiedPath), JSON.stringify(models));
  console.log("✅ Generated models.min.json");
}

build().catch(console.error);