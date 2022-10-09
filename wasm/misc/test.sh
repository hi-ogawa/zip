#!/bin/bash
set -eu -o pipefail

node bin/zip-info.js ../tests/data/files_and_dirs.zip

node bin/zip-extract.js ../tests/data/files_and_dirs.zip 0
