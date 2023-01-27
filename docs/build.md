# How to build and test cli locally

Update the version number for the CLI in:

1. Source code "src/data-types/data-types.ts"
1. README.md
1. package.json.t

Next build the project locally.

```sh
npm run build
```

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
