#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D @types/node cross-env cross-var gazeall
npm i -D shx typescript typescript-formatter concurrently
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
rm -f package-lock.json
rm -rf node_modules
