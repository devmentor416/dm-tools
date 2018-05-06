#!/usr/bin/env bash
cp package.json.1 package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D ava browser-sync browserify core-js cross-env esdoc
npm i -D cross-var gazeall husky npm-run-all nyc shx tachyons tap-summary tape-run
npm i -D esdoc esdoc-standard-plugin eslint prettier
npm i -S bunyan dm-css pino
rm -f package-lock.json
rm -rf node_modules
