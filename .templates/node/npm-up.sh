#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -S bunyan
npm i -D @types/bunyan @types/node
npm i -D ava cross-env cross-var gazeall husky concurrently
npm i -D npm-run-all nyc shx tachyons tap-summary tape-run typedoc typescript typescript-formatter
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
rm -f package-lock.json
rm -rf node_modules
