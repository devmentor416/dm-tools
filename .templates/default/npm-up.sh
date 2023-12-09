#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules

npm i -S bunyan
npm i -D @types/bunyan @types/node cross-env cross-var gazeall
npm i -D npm-run-all shx typedoc typescript prettier typedoc-plugin-markdown
npm i -D mocha chai @types/chai sinon @types/sinon @types/mocha
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
# npm i -D ava nyc tap-summary tape-run
yarn

if [ "$1" = "-" ]; then
  rm -rf node_modules
  rm -f package-lock.json yarn.lock
fi
