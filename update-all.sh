#!/usr/bin/env bash

projects=(
apollo-graphql-server
default
javascript
koa
node
typescript
web
)

pushd .templates

for folder in ${projects[*]}
do
  pushd ${folder}
    cp ../../README.md .
    ./npm-up.sh
    rm -rf node_modules
    rm -f package-lock.json
  popd
done

popd
