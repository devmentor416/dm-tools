{
  "name": "@dm-tools/demo",
  "version": "0.1.0",
  "description": "DM-Tools generated Website demo project",
  "main": "src/index.html",
  "config": {
    "main": "src/main.js"
  },
  "scripts": {
    "web": "run-p webdev webwatch",
    "webdev": "gazeall -V -s 'webclean webbuild1 webbuild2 sassbuild' 'src/**/*'",
    "webbuild1": "shx mkdir build",
    "webbuild2": "shx cp -r src/ build/src/",
    "webwatch": "browser-sync start --config bs-config.js",
    "webrefresh": "browser-sync reload",
    "webclean": "shx rm -rf build",
    "sassbuild": "sass src/:build/src/css/"
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
