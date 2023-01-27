#!/usr/bin/env bash

pushd .templates

folders=( apollo-graphql-server javascript koa node typescript web )

for folder in ${folders[*]}
do
  pushd ${folder}
  cp ../../README.md .
    ./npm-up.sh
  popd
done

popd
