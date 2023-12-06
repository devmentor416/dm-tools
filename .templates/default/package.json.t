{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated TypeScript Node.js demo Server with static Website",
  "main": "src/main.ts",
  "config": {
    "main": "build/main.js"
  },
  "scripts": {
    "clean": "shx rm -rf build",
    "predev": "run-s format clean",
    "dev": "concurrently 'npm:build' 'npm:test'",
    "prebuild": "run-s format clean",
    "build": "tsc -p tsconfig.json --sourceMap --outDir build -w",
    "watch": "gazeall build/main.js",
    "format": "prettier --write ./src",
    "test": "mocha -w --recursive build/**/*.test.js",
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
  }
}
