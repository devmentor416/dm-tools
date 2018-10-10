#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -S bcrypt bunyan core-js dm-css jsonwebtoken koa @koa/cors@2 koa-better-router koa-body koa-router
npm i -D @types/bunyan @types/core-js @types/cors @types/koa @types/koa-router @types/node
npm i -D ava clang-format cross-env cross-var gazeall husky npm-run-all nyc shx tap-summary tape-run tslint typedoc typescript typescript-formatter
rm -f package-lock.json
rm -rf node_modules
