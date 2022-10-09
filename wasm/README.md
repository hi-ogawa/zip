# zip.wasm

```sh
# build
pnpm i
npm run dev

# example
node bin/zip-info.js ~/Downloads/sudachi-dictionary-20220729-small.zip
node bin/zip-extract.js ~/Downloads/sudachi-dictionary-20220729-small.zip 3

# release
npm run build
npm publish --access public
```
