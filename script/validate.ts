#!/usr/bin/env bun

import { generate } from "../packages/core/src/index.ts";
import path from "path";
import { ZodError } from "zod";

try {
  const result = await generate(path.join(import.meta.dir, "..", "providers"));
  console.log("✅ Successfully validated all providers");
} catch (e: any) {
  if (e instanceof ZodError) {
    console.error("Validation error:", e.errors);
    console.error("When parsing:", e.cause);
    process.exit(1);
  }
  throw e;
}
