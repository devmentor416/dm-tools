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
    cp -r ../../img/ .
    rm ./img/dm-tools.ai
    ./npm-up.sh
    rm -rf node_modules
  popd
done

popd
