#!/usr/bin/env bash
npm login --registry https://registry.npmjs.org
npm publish

if [ $? -eq 0 ]; then
  echo "Devmentor-tools has been published to NPM successfully"
  echo "https://www.npmjs.com/package/dm-tools"
else
  echo "ERROR: Something went wrong"
fi
