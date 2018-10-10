#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D ava browser-sync browserify core-js cross-env esdoc
npm i -D cross-var gazeall husky npm-run-all nyc shx tachyons tap-summary tape-run
npm i -D esdoc esdoc-standard-plugin eslint prettier
npm i -S bunyan dm-css
rm -f package-lock.json
rm -rf node_modules
