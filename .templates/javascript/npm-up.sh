#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D @babel/cli @babel/core @babel/preset-env @babel/polyfill
npm i -D ava browser-sync browserify cross-env esdoc
npm i -D cross-var gazeall husky npm-run-all nyc shx shx tap-summary tape-run
npm i -D esdoc esdoc-standard-plugin eslint prettier
npm i -S bootstrap dm-css jquery popper.js
npm i -S bunyan dm-css
rm -f package-lock.json
rm -rf node_modules
