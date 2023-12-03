{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated Website demo project",
  "main": "src/index.html",
  "config": {
    "main": "src/main.js"
  },
  "scripts": {
    "start": "run-p dev web",
    "dev": "gazeall -V -s 'prebuild build webrefresh' 'src/**/*'",
    "web": "browser-sync start --config bs-config.js",
    "webrefresh": "browser-sync reload",
    "prebuild": "shx rm -rf css",
    "build": "sass src/:css/"
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
  }
}
