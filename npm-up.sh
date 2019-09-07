#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -S commander shelljs
npm i -D @types/bunyan @types/core-js @types/node @types/shelljs
npm i -D ava core-js cross-env cross-var husky
npm i -D npm-run-all nyc shx tslint typedoc typescript typescript-formatter
