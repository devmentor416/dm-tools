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

for ext in ${projects[*]}
do
  pushd ${ext}
  ./npm-up.sh
  rm -rf node_modules
  rm -f package-lock.json
  popd
done

popd
