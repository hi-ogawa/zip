import { describe, expect, it } from "vitest";
import { exec } from "node:child_process";
import { promisify } from "node:util";

describe("zip-info.js", () => {
  it("basic", async () => {
    expect(
      await promisify(exec)(
        "node bin/zip-info.js ../tests/data/files_and_dirs.zip"
      )
    ).toMatchInlineSnapshot(`
      {
        "stderr": "",
        "stdout": "{
        entries: [
          {
            file_name: 'file0.txt',
            uncompressed_size: 18,
            compressed_size: 18,
            compression_method: 'Stored'
          },
          {
            file_name: 'dir1/',
            uncompressed_size: 0,
            compressed_size: 0,
            compression_method: 'Stored'
          },
          {
            file_name: 'dir2/',
            uncompressed_size: 0,
            compressed_size: 0,
            compression_method: 'Stored'
          }
        ]
      }
      ",
      }
    `);
  });
});

describe("zip-extract.js", () => {
  it("basic", async () => {
    expect(
      await promisify(exec)(
        "node bin/zip-extract.js ../tests/data/files_and_dirs.zip 0"
      )
    ).toMatchInlineSnapshot(`
      {
        "stderr": "",
        "stdout": "File at the root.
      ",
      }
    `);
  });
});
