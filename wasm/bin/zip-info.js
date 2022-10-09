#!/usr/bin/env node

import * as fs from "node:fs";
import { initialize } from "./initialize.js";

async function main() {
  const [zipPath] = process.argv.slice(2);
  if (!zipPath) {
    console.error("usage: zip-info.js <zip-file>");
    process.exit(1);
  }
  const zipData = new Uint8Array(await fs.promises.readFile(zipPath));
  const { read_metadata } = await initialize();
  console.log(read_metadata(zipData));
}

main();
