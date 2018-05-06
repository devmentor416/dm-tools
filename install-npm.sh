#!/usr/bin/env bash
cp package.json.1 package.json
rm -f package-lock.json
rm -rf node_modules
npm i -S commander shelljs
npm i -D @types/bunyan @types/core-js @types/lodash @types/node @types/shelljs
npm i -D ava browser-sync browserify core-js cross-env cross-var husky
npm i -D npm-run-all nyc shx tap-summary tape-run tslint typedoc typescript typescript-formatter
