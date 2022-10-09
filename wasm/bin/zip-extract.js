#!/usr/bin/env node

import * as fs from "node:fs";
import * as assert from "node:assert";
import * as process from "node:process";
import { initialize } from "./initialize.js";

async function main() {
  let [zipPath, entryIndex] = process.argv.slice(2);
  entryIndex = Number(entryIndex);
  if (!zipPath || !Number.isInteger(entryIndex)) {
    console.error("usage: zip-extract.js <zip-file> <entry-index>");
    process.exit(1);
  }
  const zipData = new Uint8Array(await fs.promises.readFile(zipPath));

  // initialize library
  const { read_metadata, extract_by_index } = await initialize();

  // read metadata
  const { entries } = read_metadata(zipData);
  const entry = entries[entryIndex];
  assert.ok(entry);

  // allocate and extract to it
  const outData = new Uint8Array(entry.uncompressed_size);
  extract_by_index(zipData, entryIndex, outData);

  // write to stdout
  process.stdout.write(outData);
}

main();
