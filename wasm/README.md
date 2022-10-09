# zip.wasm

```sh
# build
pnpm i
npm run dev

# example
node bin/zip-info.js ../tests/data/files_and_dirs.zip
node bin/zip-extract.js ../tests/data/files_and_dirs.zip 0

# release
npm run build
npm publish --access public
```
