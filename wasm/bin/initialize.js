import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as lib from "../pkg/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_WASM_PATH = path.resolve(__dirname, "..", "pkg", "index_bg.wasm");

export async function initialize(wasmPath) {
  // compile wasm
  const wasmSource = await fs.promises.readFile(wasmPath ?? DEFAULT_WASM_PATH);
  const wasmModule = await WebAssembly.compile(wasmSource);

  // initialize wasm
  lib.initSync(wasmModule);
  return lib;
}
