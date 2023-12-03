#!/usr/bin/env bash
# Update Script for NPM Modules.
# Run this to install the latest modules and update package.json
# package.json.t is the template file, make changes there!
cp package.json.t package.json
rm -f package-lock.json
rm -rf node_modules
npm i -D browser-sync gazeall npm-run-all sass shx
npm i -S bootstrap dm-css
