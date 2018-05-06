#!/usr/bin/env bash
cp package.json.1 package.json
rm -f package-lock.json
rm -rf node_modules
npm i -S bunyan dm-css pino
npm i -D @types/bunyan @types/core-js @types/node ava browser-sync browserify core-js cross-env cross-var gazeall husky
npm i -D npm-run-all nyc shx tachyons tap-summary tape-run tslint typedoc typescript typescript-formatter
rm -f package-lock.json
rm -rf node_modules
