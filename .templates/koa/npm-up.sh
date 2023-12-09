#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D ava cross-env cross-var gazeall npm-run-all nyc shx tap-summary
npm i -D typedoc typedoc-plugin-markdown typescript tape-run prettier concurrently
npm i -S bcrypt bunyan jsonwebtoken koa @koa/router koa-body @koa/cors koa-helmet
npm i -D @types/bunyan @types/node @types/shelljs @types/koa__cors @types/koa__router
npm i -D eslint esdoc @typescript-eslint/parser @typescript-eslint/eslint-plugin
yarn

if [ "$1" = "-" ]; then
  rm -rf node_modules
  rm -f package-lock.json yarn.lock
fi
