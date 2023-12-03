#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -S bootstrap bunyan dm-css jquery popper.js
npm i -D @types/bunyan @types/node ava browser-sync browserify cross-env cross-var gazeall husky
npm i -D npm-run-all nyc shx tap-summary tape-run typedoc typescript prettier concurrently jest
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
