#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D @types/node cross-env cross-var gazeall nodemon
npm i -D npm-run-all shx typescript prettier concurrently
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm i -D mocha chai @types/chai sinon @types/sinon @types/mocha
