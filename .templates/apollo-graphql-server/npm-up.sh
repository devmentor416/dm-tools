#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -S apollo-server bunyan dm-css graphql
npm i -S bcrypt bunyan jsonwebtoken koa koa-better-router koa-body @koa/cors koa-router
npm i -D @babel/cli @babel/core @babel/preset-env @babel/polyfill
npm i -D ava browser-sync core-js cross-env cross-var gazeall husky
npm i -D cross-var gazeall npm-run-all nyc shx tap-summary tape-run eslint esdoc esdoc-standard-plugin prettier
rm -f package-lock.json
rm -rf node_modules
