{
  "name": "dm-tools",
  "version": "0.7.1",
  "description": "Dev Mentor Project Creator Tools",
  "main": "src/main.ts",
  "bin": {
    "dm": "bin/main.js"
  },
  "config": {
    "doc_folder": "docs/typedoc"
  },
  "scripts": {
    "build": "cross-env NODE_ENV=production tsc",
    "build:test": "cross-env NODE_ENV=test tsc -p ./tsconfig.test.json",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "clean": "shx rm -rf bin",
    "doc": "typedoc --module commonjs --target ES5 --ignoreCompilerErrors --exclude node_modules --out $npm_package_config_doc_folder src",
    "format": "tsfmt -r --baseDir ./",
    "node:debug": "node --inspect --debug-brk $npm_package_bin_cli",
    "postbuild": "npm link",
    "prebuild": "run-s format lint clean unlink",
    "precommit": "run-s format lint",
    "predoc": "shx rm -rf $npm_package_config_doc_folder && shx mkdir -p $npm_package_config_doc_folder",
    "prepush": "npm run test",
    "pretest": "run-s clean build:test",
    "test": "nyc ava --tap bin/**/*/test.*.js",
    "unlink": "npm unlink -g"
  },
  "keywords": [
    "devmentor",
    "javascript",
    "js",
    "project-creator",
    "starter",
    "tool",
    "utility",
    "ts",
    "tscli",
    "typescript",
    "nodejs",
    "web"
  ],
  "author": "Rajinder Yadav <devguy.ca@gmail.com>",
  "license": "GPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/devmentor416/dm-tools"
  },
  "devDependencies": {
  },
  "dependencies": {
  },
  "nyc": {
    "lines": 0,
    "statements": 0,
    "functions": 0,
    "branches": 0,
    "include": [
      "bin/**/*.js"
    ],
    "exclude": [
      "bin/**/*.spec.js",
      "bin/**/test.*.js",
      "bin/**/main.js"
    ],
    "reporter": [
      "text",
      "lcov",
      "text-summary",
      "html"
    ],
    "cache": true,
    "all": true,
    "check-coverage": true
  }
}
