{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated TypeScript Node.js demo Server",
  "main": "src/core/main.ts",
  "config": {
    "main": "build/core/main.js",
    "doc_folder": "docs/typedoc"
  },
  "scripts": {
    "ava": "ava --tap 'build/**/*/test.*.js'|tap-summary",
    "ava:coverage": "nyc ava --tap 'build/**/*/test.*.js'|tap-summary",
    "build": "cross-env NODE_ENV=production tsc",
    "build:test": "cross-env NODE_ENV=test tsc -p ./tsconfig.test.json",
    "browser": "/usr/bin/google-chrome-stable --new-window || /usr/bin/brave-browser --new-window",
    "debug": "node --inspect-brk $npm_package_config_main",
    "clean": "shx rm -rf build",
    "dev": "gazeall -V --npms 'clean format lint devbuild devwatch' -w 'src/**/*'",
    "devbuild": "cross-env NODE_ENV=dev tsc -p ./tsconfig.dev.json",
    "devwatch": "node build/core/main.js",
    "doc": "typedoc --plugin typedoc-plugin-markdown --out $npm_package_config_doc_folder",
    "format": "prettier --write ./src",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "prebuild": "run-s format clean lint",
    "precommit": "run-s format lint",
    "predebug": "run-s clean devbuild",
    "predoc": "shx rm -rf $npm_package_config_doc_folder && shx mkdir -p $npm_package_config_doc_folder",
    "prepush": "npm run test",
    "prestart": "npm run release",
    "pretest": "run-s clean build:test",
    "release": "run-s clean format lint build",
    "start": "node $npm_package_config_main",
    "test": "npm run ava:coverage",
    "test:e2e": "cypress open",
    "testwatch": "gazeall --delay 350 --npms ava 'build/**/*'",
    "test:web": "cross-env NODE_ENV=test browserify 'build/**/*/test.*.js'|tape-run|tap-summary"
  },
  "keywords": [
    "javascript",
    "js",
    "ts",
    "typescript",
    "nodejs",
    "web",
    "css",
    "sass"
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
  "devDependencies": {
  },
  "dependencies": {
  }
}
