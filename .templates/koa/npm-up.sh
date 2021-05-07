#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D @babel/cli @babel/core @babel/preset-env @babel/polyfill
npm i -D ava cross-env cross-var gazeall npm-run-all nyc shx tap-summary
npm i -D tape-run eslint esdoc esdoc-standard-plugin prettier
npm i -S bcrypt bunyan jsonwebtoken koa koa-better-router koa-body @koa/cors koa-helmet koa-router
rm -f package-lock.json
rm -rf node_modules
