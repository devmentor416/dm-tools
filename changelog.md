# DM-Tools Change Log

All changes to this project will be recorded in this document.

## 0.7.1 (2023-12-09)

- Fix and improved No IDE debugging support.
- Updated README with improvded debugging section.

## 0.7.0 (2023-12-09)

- Refresh all template projects.
- Major code refactor to remove use of implicit and explicit any.
- Fix CPP build.

## 0.6.0 (2023-12-03)

- NPM refresh for projects.
- Improved Web, now builds using Sass.
- NPM script corrections due to changes.

## 0.5.0 (2021-11-17)

- New default slim TypeScript project.
- Open project in code-insider.
- Add concurrently NPM script runner.

## 0.4.1 (2021-09-24)

- Switched to eslint for TS.
- Linting code fix.
- Fix CPP support and added back in.
- update gitignore files.

## 0.4.0 (2021-09-24)

- Updated templates tsconfig files.
- Updated NPM modules in templates.
- Fixed code due to Commander update.

## 0.3.1 (2019-09-07)

- NPM Module updates.
- CORS added to js and ts Node.js code.

## 0.3.0 (2019-01-03)

- Project refactoring.

## 0.2.0 (2018-11-17)

- Added Apollo GraphQL server.
- Using Babel for projects JavaScript, Koa, Apollo.
- Cleaned up code to use ES2016 import and export keyword and modules.
- Added Koa template.

## 0.1.9

- Critical bug fixed, ending spawned child process.

## 0.1.8

- DM-Tools now has configuration file support.
- JavaScript template code cleanup.
- Readme cleanup.

## 0.1.7 (2017-11-25)

- Critical bug fix for C++ project creation.

## 0.1.6 (2017-11-24)

- Logo update.
- Added example NodeJS server code for TypeScript and JavaScript.
- Corrected a bug with parsing flags for --cpp.
- Added "use strict" for all source code.
- Fixed filename type for JavaScript template.

## 0.1.5 (2017-11-22)

- Cleanup and code refactoring.
- Updated README.
- Add C++ project creation.

## 0.1.3 (2017-11-19)

- Project renamed from TSCLI to DM-Tools.
- TypeScript Formatter config updated.
- TSLint config updated.
- NPM Packages updated.
- NPM Linting script renamed to lint from check.
- New flag '--e2e' installed cypress testing module.

## 0.1.2-alpha-21 (2017-10-12)

- For JavaScript project now using ESDoc.
- Bootstrap 4.
- Switched to using BrowserSync.
- NPM Module updated.
- Separated logged code to its own module.
- Default template now builds to ES2017.
- TS format config updated.
- New switch `ts` added to cli.

## 0.1.2-alpha-20 (2017-08-23)

- Boostrap 4 beta.
- Relaxing linting rule to allow build success.
- NPM package update.

## 0.1.2-alpha-19 (2017-04-29)

- Updated TypeScript rules (project, default, node).
- Updated NPM modules (project, default, node, js).
- Corrected usage text.
- New build

## 0.1.2-alpha-18 (2017-04-19)

- Switched to using lite-server, needed for Angular.
- Changed project creation messages.
- Changed how `undefined` field is tested.
- README update for lite-server mention and Web development.
- Added Web development support.
- Fixed (help) usage text.

## 0.1.2-alpha-17 (2017-03-19)

- Version bump
- Project creation supported are: Default, JS, Node.js
- UpCorrected TSCLI usage text for supported projects.
- Updated README

## 0.1.2-alpha-16 (2017-03-19)

- Fixed NPM script error in TSCLI.
- Added folder check before project creation.
- Added test watch NPM script.
- Fixed delay switch in NPM scripts.
- Removed magic-number lint check, doesn't work as you might expect.
- Fixed pretest script use on cross-env.

## 0.1.2-alpha-15 (2017-03-17)

- Switch to using Ava for testing.
- Added code coverage.
- Updated README with test coverage details.

## 0.1.2-alpha-14 (2017-03-17)

- Added project creation for Node.js
- Added Greenkeeper support to project.

## 0.1.2-alpha-13 (2017-03-16)

- New rules added to tslint.
- Update NPM packages.
- Removed postweb NPM script from default project.

## 0.1.2-alpha-12 (2017-03-14)

- Deleted a console debug.
- Minor README update.

## 0.1.2-alpha-11 (2017-03-14)

- Changed how dev-watch mode works for default template.
- Fixed how web-watch NPM script for default template.
- Removed `predev` script from template for JavaScript.
- Update README in default template.

## 0.1.2-alpha-10 (2017-03-13)

- Alpha release version bump.

## 0.1.2-alpha-9 (2017-03-13)

- Delete .npmignore file, causing problem with generated project.

## 0.1.2-alpha-8 (2017-03-13)

- Fixed JavaScript project dev script.

## 0.1.2-alpha-7 (2017-03-12)

- Cleaned project .gitignore files
- Added support for JavaScript NodeJS project creation

The JavaScript NodeJS support speeds up the dev process, specially if you want to try our code quickly. This is done by skipping the compile step and using Nodejs ES6 language support. You will still need to use NodeJS `require` to import files as well as NodeJS modules.

## 0.1.2-alpha-5 (2017-03-11)

- Fix NPM error of missing depedency.
- New logo image added to README.
- README corrections.

## 0.1.2-alpha-4 (2017-03-11)

- Cleaned up NPM scripts.
- Silenced inital generated commit.

- Doc output folder is a config setting, `doc_folder`.
- The entry file for `npm start` is a config setting, `main`.

```js
  "config": {
    "main": "build/main.js",
    "doc_folder": "docs/typedoc"
  },
```

- Fixed NPM scripts to correctly use Node's recurse folder syntax.
- Fixed Web script, now servers from build folders and copies over file, `index.html`.
- Fixed missing `<head>` tag in file, `index.html`.
- Updated README with sub-sction on Browsersync, setting up asset serving.
- Update NPM package modules.

## 0.1.2-alpha.3 (2017-02-26)

- Fixed issues in generated app throwing an error, since the `log/` folder not created.

## 0.1.2-alpha.2 (2017-02-26)

- Fixed version number, displayed when typing, `cli -V`.

## 0.1.2-alpha.1 (2017-02-26)

- Deleted project starter kit.
- Added _default_ project template.
- The TSCLI command is called, `cli`. It now generates a default TypeScript demo project.

To create a new project, from the terminal use the command:

```sh
cli new <project-name>
```

See README in generated project for additional details.

## 0.1.1 (2017-02-23)

- New scripts
  1. Git hooks
  1. Static web dev using Browsersync

- Removed `.gitignore` entry.
- Update demo code, `main.ts` with logging.
- Update README.
- Moved `test.utils.ts` file, co-located with file being tested.
- Added `yarn.lock` file.
- Added configuration file for Browsersync.
- Added static HTML file, `index.html` as a template.

## 0.1.0 (2017-02-23)

- Initial project commit.

This is evolving project structure which will be used as a template for TypeScript project generation using the TSCLI tools.

Please see README for details on this project.
