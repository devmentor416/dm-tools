#!/usr/bin/env bash
cp package.json.1 package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D @types/bunyan @types/core-js @types/node ava browser-sync browserify core-js cross-env
npm i -D cross-var gazeall husky npm-run-all nyc shx tachyons tap-summary tape-run tslint typedoc typescript typescript-formatter
npm i -S bunyan dm-css pino
rm -f package-lock.json
rm -rf node_modules
