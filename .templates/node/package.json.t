{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated TypeScript demo project",
  "main": "src/main.ts",
  "config": {
    "main": "build/main.js",
    "doc_folder": "docs/typedoc"
  },
  "scripts": {
    "ava": "ava --tap \"build/**/*/test.*.js\"|tap-summary",
    "ava:coverage": "nyc ava --tap \"build/**/*/test.*.js\"|tap-summary",
    "build": "cross-env NODE_ENV=production tsc",
    "build:test": "cross-env NODE_ENV=test tsc -p ./tsconfig.test.json",
    "lint": "tslint -t codeFrame \"src/**/*.ts\"",
    "clean": "shx rm -rf build",
    "dev": "cross-env NODE_ENV=dev tsc -w",
    "devwatch": "gazeall --delay 350 --run \"node build/main.js\" \"build/**/*\"",
    "doc": "typedoc --module commonjs --target ES5 --ignoreCompilerErrors --exclude node_modules --out $npm_package_config_doc_folder src",
    "format": "tsfmt -r --baseDir ./",
    "node:debug": "node --inspect --debug-brk $npm_package_config_main",
    "prebuild": "run-s format lint clean",
    "precommit": "run-s format lint",
    "predoc": "shx rm -rf $npm_package_config_doc_folder && shx mkdir -p $npm_package_config_doc_folder",
    "prepush": "npm run test",
    "prestart": "npm run build",
    "pretest": "run-s clean build:test",
    "start": "node $npm_package_config_main",
    "test": "npm run ava:coverage",
    "test:e2e": "cypress open",
    "testwatch": "gazeall --delay 350 --runs-npm ava \"build/**/*\"",
    "tsc": "tsc"
  },
  "keywords": [
    "javascript",
    "js",
    "ts",
    "typescript",
    "nodejs"
  ],
  "author": "[Fullname] <your-email>",
  "license": "GPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/<github-user-id>/<project-name>"
  },
  "devDependencies": {
  },
  "dependencies": {
  },
  "nyc": {
    "lines": 10,
    "statements": 10,
    "functions": 10,
    "branches": 10,
    "include": [
      "build/**/*.js"
    ],
    "exclude": [
      "build/**/*.spec.js",
      "build/**/test.*.js",
      "build/**/main.js"
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
