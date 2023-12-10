{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated JavaScript demo Server",
  "main": "src/core/main.ts",
  "config": {
    "main": "src/core/main.js"
  },
  "scripts": {
    "ava": "ava --tap 'build/**/test.*.js'|tap-summary",
    "ava:coverage": "nyc ava --tap 'build/**/test.*.js'|tap-summary",
    "clean": "shx rm -rf build",
    "prebuild": "run-s format lint clean",
    "build": "babel src --out-dir build",
    "build:dev": "babel -w src --out-dir build",
    "browser": "/usr/bin/google-chrome-stable --new-window || /usr/bin/brave-browser --new-window",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "dev": "concurrently --kill-others npm:devbuild npm:devwatch",
    "devbuild": "run-s clean format lint build:dev",
    "devwatch": "gazeall --run 'node build/core/main.js' 'build/**/*'",
    "doc": "esdoc",
    "format": "prettier --single-quote --write 'src/**/*.js'",
    "debug": "node --inspect-brk $npm_package_config_main",
    "precommit": "run-s format lint",
    "predoc": "shx rm -rf ./docs/project && shx mkdir -p ./docs/project",
    "prepush": "npm run test",
    "start": "node $npm_package_config_main",
    "pretest": "run-s clean build",
    "release": "run-s clean format lint build",
    "test": "npm run ava:coverage",
    "test:e2e": "cypress open",
    "testwatch": "gazeall --runs-npm ava 'build/**/*'",
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
