# How to build and test cli locally

Update the version number for the CLI in:

1. README.md
1. data-types.ts
1. package.json
1. package.json.t

Next build the project locally, this will also link it globally to make it avaliable under node_modules.

After the build the dm binary will be available to use. It doesn't need to be installed.

```sh
npm run build
```

## Alternative

Finally create a zipped package for testing, from the project root folder type:

```sh
npm pack
npm i -g ./dm-tools-0.4.1.tgz
```

## Update project NPM modules

From the project root folder, type:

```sh
./npm-up.sh
```

## Update templates NPM modules

From the project root folder, type:

```sh
./update-templates.sh
```

## Publish to NPM

```sh
./publish-npm.sh
```
