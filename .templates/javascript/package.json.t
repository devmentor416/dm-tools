{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated JavaScript demo project",
  "main": "src/main.ts",
  "config": {
    "main": "src/main.js"
  },
  "scripts": {
    "ava": "ava --tap \"src/**/*/test.*.js\"|tap-summary",
    "ava:coverage": "nyc ava --tap \"src/**/*/test.*.js\"|tap-summary",
    "lint": "eslint \"src/**/*.js\"",
    "devwatch": "gazeall --run \"node src/main.js\" \"src/**/*\"",
    "doc": "esdoc",
    "format": "prettier --write \"src/**/*.js\"",
    "node:debug": "node --inspect --debug-brk $npm_package_config_main",
    "precommit": "run-s format lint",
    "predoc": "shx rm -rf ./docs/project && shx mkdir -p ./docs/project",
    "prepush": "npm run test",
    "start": "node $npm_package_config_main",
    "test": "npm run ava:coverage",
    "test:e2e": "cypress open",
    "testwatch": "gazeall --runs-npm ava \"src/**/*\"",
    "web": "browser-sync start --config bs-config.js"
  },
  "keywords": [
    "javascript",
    "js",
    "nodejs",
    "html",
    "web"
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
      "src/**/*.js"
    ],
    "exclude": [
      "src/**/*.spec.js",
      "src/**/test.*.js",
      "src/**/main.js"
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
