{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated demo Koa Server",
  "main": "src/core/main.js",
  "config": {
    "dev": "build/dev/",
    "test": "build/test/",
    "prod": "build/prod/",
    "doc_folder": "docs/generated"
  },
  "scripts": {
    "ava": "ava --tap \"build/**/test.*.js\"|tap-summary",
    "ava:coverage": "nyc ava --tap \"build/**/test.*.js\"|tap-summary",
    "build": "babel src --out-dir build",
    "build:dev": "babel -w src --out-dir build",
    "lint": "eslint ./src/**/*.js",
    "clean": "shx rm -rf build",
    "debug": "node --inspect --debug-brk $npm_package_config_dev",
    "dev": "run-s clean build:dev",
    "devwatch": "gazeall ./build/core/main.js",
    "doc": "esdoc",
    "format": "prettier --write ./src/**/*.js",
    "prebuild": "run-s format lint clean",
    "predoc": "shx rm -rf $npm_package_config_doc_folder && shx mkdir -p $npm_package_config_doc_folder",
    "prepush": "npm run test",
    "prestart": "npm run build",
    "pretest": "run-s build",
    "start": "node $npm_package_config_prod",
    "test": "npm run ava:coverage"
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
