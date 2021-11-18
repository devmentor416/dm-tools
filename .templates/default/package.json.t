{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated TypeScript Node.js demo Server with static Website",
  "main": "src/main.ts",
  "config": {
    "main": "build/main.js"
  },
  "scripts": {
    "dev": "cross-env NODE_ENV=dev tsc -w",
    "devwatch": "gazeall --delay 350 --run \"node build/main.js\" \"build/**/*\"",
    "format": "tsfmt -r --baseDir ./",
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
