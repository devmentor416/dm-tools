#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json yarn.lock
rm -rf node_modules
npm i -S commander shelljs
npm i -D @types/bunyan @types/node @types/shelljs
npm i -D ava cross-env cross-var husky
npm i -D npm-run-all nyc shx typedoc typescript typescript-formatter
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
yarn

if [ "$1" = "-" ]; then
  rm -rf node_modules
  rm -f package-lock.json yarn.lock
fi
