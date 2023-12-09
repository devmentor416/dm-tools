{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated TypeScript Node.js program",
  "main": "build/main.js",
  "config": {
    "main": "build/main.js",
    "doc_folder": "docs/typedoc"
  },
  "scripts": {
    "build": "cross-env NODE_ENV=production tsc",
    "build:test": "cross-env NODE_ENV=test tsc -p ./tsconfig.test.json",
    "clean": "shx rm -rf build",
    "dev": "gazeall -V --npms 'clean format lint devbuild devwatch' -w 'src/**/*'",
    "devbuild": "cross-env NODE_ENV=dev tsc",
    "devwatch": "node build/main.js",
    "doc": "typedoc --plugin typedoc-plugin-markdown --out $npm_package_config_doc_folder",
    "format": "prettier --write ./src",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "node:debug": "node --inspect --debug-brk $npm_package_config_main",
    "prebuild": "run-s format clean lint",
    "precommit": "run-s format",
    "predoc": "shx rm -rf $npm_package_config_doc_folder && shx mkdir -p $npm_package_config_doc_folder",
    "prepush": "npm run test",
    "prestart": "npm run release",
    "pretest": "run-s clean build:test",
    "release": "run-s clean format build",
    "start": "node $npm_package_config_main",
    "test": "mocha build/**/*.test.js",
    "testwatch": "mocha -w --recursive build/**/*.test.js"
  },
  "keywords": [
    "javascript",
    "js",
    "ts",
    "typescript",
    "nodejs",
    "web"
  ],
  "author": "[Fullname] <your-email>",
  "license": "GPL-3.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/<github-user-id>/<project-name>"
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
  },
  "dependencies": {
  },
  "devDependencies": {
  }
}
