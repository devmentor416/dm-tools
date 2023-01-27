# Dev Mentor Project Creator Tools

![Travis](https://img.shields.io/travis/devmentor416/dm-tools.svg)
![Dependencies](https://david-dm.org/devmentor416/dm-tools.svg)
![Version](https://img.shields.io/badge/dm--tools-0.4.5-blue.svg)
![License](https://img.shields.io/badge/license-GPL--4.0-blue.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/devmentor416/dm-tools.svg)](https://greenkeeper.io/)

![Image Logo](img/dm-tools.png)
<!-- TOC -->

- [Introduction](#introduction)
- [Project Types](#project-types)
- [Installing DM-Tools](#installing-dm-tools)
- [Creating a Project](#creating-a-project)
- [Running a Node.js program](#running-a-nodejs-program)
  - [Running and watching during development](#running-and-watching-during-development)
    - [Terminal One](#terminal-one)
    - [Terminal Two](#terminal-two)
    - [Terminal Three](#terminal-three)
- [Benefits](#benefits)
- [TypeScript development](#typescript-development)
  - [Source code](#source-code)
  - [Building](#building)
  - [Warning](#warning)
  - [Library code (Modules)](#library-code-modules)
  - [Formatting the code](#formatting-the-code)
  - [Linting](#linting)
  - [Testing](#testing)
- [Static Web development](#static-web-development)
  - [Browsersync Asset fetching](#browsersync-asset-fetching)
- [Test coverage](#test-coverage)
- [Create a Node.js JavaScript project](#create-a-nodejs-javascript-project)
  - [TypeScript Node ES5](#typescript-node-es5)
- [Building C++ Testable Projects](#building-c-testable-projects)
  - [Basic Usage](#basic-usage)
    - [Project "hello_world" Creation](#project-hello_world-creation)
  - [Building Project](#building-project)
  - [Running hello_world program](#running-hello_world-program)
  - [Running the Test Program](#running-the-test-program)
  - [Micro Test - Testing Your Project](#micro-test---testing-your-project)
- [TypeScript Coding Guideline](#typescript-coding-guideline)

<!-- /TOC -->

## Introduction

__DM-Tools__ is a command-line utility for generating a project for the following programming languages.

1. Basic JavaScript
1. TypeScript
1. JavaScript using Babel 7
1. C++

Focus has been put into encouraging the use of best practices and the best tools.

Version of Node supported: Node v14.16.1+, for version earler you will need to polyfill using "__core-js__".

## Project Types

The following basic project types that can be created using DM-Tools are:

1. Default (JavaScript Node.js with static Website)
1. TypeScript Node.js with static Website
1. Apollo GraphQL API Server using Babel 7
1. TypeScript Node.js
1. JavaScript Node.js using Babel 7 (ES6, Zero compile with static Website)
1. Koa + Node.js API Server using Babel 7 (ES6, Zero compile with static Website)
1. C++ with Micro Test using CMake

## Installing DM-Tools

```sh
npm install -g dm-tools
```

## Creating a Project

Start playing with the demo starter project now, the generated source code is located in the project `src/` sub-folder.

```sh
dm new demo
cd demo
```

__Note__: If you are using __Yarn__ over __NPM__, continue to work with __Yarn__, the DM-Tools generated project will use Yarn before NPM if it is available on your system.

## Running a Node.js program

To simply run a Node.js program written in TypeScript you can type:

```sh
npm start
```

This will perform a clean build and run the demo program from the `build/` folder. The demo application log will be produced in the `logs/` sub-folder under the project root.

### Running and watching during development

You can also continue to watch and run a Node.js based program during development. To do this open three terminals.

- Terminal 1: The build terminal.
- Terminal 2: Run the compiled Node.js code.
- Terminal 3: Watch test results.

__Important!__: If you are encountering strange build errors in one of the terminal, it could be due to linting errors or compiler error. This unfortunately does not make it to the terminal since these operations are running through another NPM script. So to quickly see what is failing, from another terminal type, `npm run build`, this will quickly let you see the problem.

#### Terminal One

This will run the build in watch mode.

```sh
npm run dev
```

Wait for the build to complete before issuing the next command.

#### Terminal Two

This will run the Node.js program whenever new files are copied into the `build/` folder from the compiler.

```sh
npm run devwatch
```

#### Terminal Three

This runs the unit tests in watch mode when file in the `build/` folder are updated.

```sh
npm run testwatch
```

There is a delay added before the Node.js program is executed, this is to prevent premature re-running of code if multiple files are being copied to the `build/` folder. You can change the delay from the `devwatch` script (see file `package.json`) by altering the value passed using the `--delay-start` switch.

## Benefits

Here are the benefits you will enjoy right out of the gate:

- Quick start
- Best practices
- Build system
- Code in TypeScript
- Code TypeScript Modules
- HTML live edit and preview
- Error logging
- Code linting
- Code formatting
- Unit testing
- Code coverage
- Document generation
- Git commit hooks
- Continuous integration (under research)

## TypeScript development

### Source code

Place all TypeScript source code under the folder, `src/`, they will be picked up from here and compiled to the, `build/` folder under the project root.

You are free to create addition folders and sub-folders under, `src/`, the compiler will recursively find and compile all TypeScript code.

All TypeScript code is compiled to __ES5__ JavaScript. The target JavaScript code can be changed from the [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file, `tsconfig.json`.

Some of the things you may want to configure:

- Files to compile
- Folders to include
- Folders to exclude
- Target compiled output
- Source map (Needed for debugging)
- Module system (Use commonjs for Node)
- Output file

Supported compiled targets include: `ES3, ES5, ES6, ES2016, ES2017, ES2018, ES2019, ES2020`.

See [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more details.

### Building

To compile the TypeScript code, use the following command to start the build process:

```sh
npm run build
```

### Warning

The `build/` folder and all sub-folders within it will be deleted to insure a clean build is performed each time. Do not place any files you will need later in the `build/` folder.

### Library code (Modules)

Place any module or library source code that you write under the, `src/lib/`, sub-folder. The compiled source code will be output to the, `build/lib/`, sub-folder.

### Formatting the code

It is good practice to format the source code, so it conforms to a uniform structure. Avoid squabbles about style. To format the TypeScript code, type:

```sh
npm run format
```

__Note__: When the __DM-Tools__ generated project is built, the source code will be automatically formatted. This will also happen before source code is committed to __Git__.

### Linting

To validate the project TypeScript source code, use the following command:

```sh
npm run lint
```

__Note__: The TypeScript source code is run through a linter (__TSLint__) before a build and before it is committed to the Git repository. Any errors encountered must be fixed before the Git commit is allowed to proceed.

**Important!**: I have noticed, one in a while the git hooks will continue to fail when there is nothing really wrong. If you suspect this is the case, the easy fix is to delete the `node_modules` folder. Follow it with a `npm install` or simply type `yarn` and then try to commit or push the code again.

### Testing

Testing is done using __Ava__, the [test methods](https://github.com/avajs/ava#assertions) are simple and easy to learn.

__Ava__ makes testing simple. Code is easy to read since it is just JavaScript, this avoids the need to context switch to BDD syntax. Plus anyone who knows JavaScript will be able to write test code immediately.

I firmly believe less time should be put into writing test code and having more time to write production code. Ava delivers on this by keeping the setup and test writing to a bare minimum. I believe __Ava__ is the best option for writing unit test for JavaScript based code.

The test code should be __co-located__ with the production source code. As a best practice, place tests under a sub-folder called `test/`.

Pay attention to how the test source file is named: `test.<file>.ts`. So if you have a file called, `filter.ts`, the test file should be named, `test.filter.ts`.

To run the test, type:

```sh
npm test
```

__Note__: Running the test will cause a fresh build to be kicked-off. Once the build finishes, all the unit tests will be run.

## Static Web development

If you want to hack around with HTML, CSS and try things out quick. Start the project in __web__ mode using the following command:

```sh
npm run web
```

This will run the build first and then open a web browser on port 3000, and load the HTML page, `index.html` located in the `src/` sub-folder.

Any changes made to `index.html` will automatically update and browser on save. You do not need to keep hitting __refresh__ on the browser.

The website uses lite-server, which is based on Browsersync to run a local development web-server and keeps all browsers listening to it in sync. This means it is possible to have multiple browsers listening to the server.

On how to configure the setup, read the [Browsersync options](https://browsersync.io/docs/options).

Basic configurations setting you may be interested in are:

- files
- server
- proxy
- logLevel
- port

The default Browsersync UI web address is: `http://localhost:3001/`.

### Browsersync Asset fetching

With Browsersync, having to serve addition CSS and JavaScript files, make sure to add their path in routes. Something similar to like this:

```js
  "server": {
    baseDir: "src",
    routes: {
      "/node_modules/tachyons/css":"node_modules/tachyons/css"
    }
```

This will allow including `<script>` assets from the index.html file like this:

```html
<head>
  <link rel="stylesheet" href="./node_modules/tachyons/css/tachyons.min.css">
</head>
```

## Test coverage

Test coverage is done when test is run using `nyc`. The test coverage result is displayed to the console after the results of the unit tests. A folder called `coverage/` will be created under the project root. It will hold the results of the code coverage from the test run. Of interest to you will be the HTML report. It is a nice way to see what code was covered and what code was not by the unit tests.

To configure the test coverage, make changes to the `nyc` settings found in the file `package.json`.

## Create a Node.js JavaScript project

If you want to develop in plain JavaScript, or develop a ES6 Node.js based project, this is now supported. It is also good for quickly testing out code and not getting slowed down by the compile step.

You will need the latest version of Node.js for ES6 and beyond support, otherwise plain JavaScript will continue to work.

```sh
dm new demo --type js
npm install
```

__Note__: You may also use `-t` which is the short-form for `--type`.

The following NPM commands are supported:

NPM script|Description
----------|-----------
lint|Run code through linter (jslint).|
dev|Run in watch mode.|
doc|Generate doc files (jsdocs).|
format|Format the source code.|
node:debug|Start debugger, requires Chrome.|
start|Run the Node.js program.|
test|Run Unit testing (Ava).|

The plain JavaScript generated file has a development mode. It will run the __Entry__ file (`main.js`) using Node.js each time the source code is updated. You can develop and see the output from the __terminal__ to test out code quickly.

```sh
npm run dev
```

### TypeScript Node ES5

If you need to use ES5 Node.js support with TypeScript here are the following change you need to make.

Make sure you're using Node v14.16.1 or higher.

Add the following two lines under compilerOptions to `tsconfig.json` and `tsconfig.test.json`.

```js
"compilerOptions": {
  "target": "es2020",
  "lib": [
    "es2020",
    "es2019",
    "es2018",
    "es2017",
    "dom"
    ]
}
```

## Building C++ Testable Projects

DM-Tools can be used to create a C++ project with Unit Testing setup using [Micro Test](https://github.com/rajinder-yadav/micro_test).

The C++ project uses [CMake](https://cmake.org/) to generate cross-platform Makefiles for:

1. Linux
1. MacOS
1. Windows

### Basic Usage

Let us go through the steps of creating a simple "hello_world" project.

#### Project "hello_world" Creation

The created project will be found under the __hello_world__ folder.

```sh
cd /tmp
dm new hello_world --cpp
```

### Building Project

The Makefile is located under sub-folder build.

```sh
cd hello_world/build
make
```

### Running hello_world program

The executable hello_world will be found in the build folder.

```sh
./hello_world
```

### Running the Test Program

The test program is located under build/test/ sub-folder. Initially one failing test is created for you to follow.

```sh
./test/test.hello_world
```

### Micro Test - Testing Your Project

DM-Tools creates a test sub-folder under src/ and uses the latest Micro Test header file, it basically pulls it from the Micro Test Git repository.

To learn more about how to write tests using [Micro Test](https://bitbucket.org/rajinder_yadav/micro_test) check out the project site. You will be amazed how simple and fast it is to write test code.

## TypeScript Coding Guideline

Read the [coding guideline](https://github.com/devmentor416/devmentor/wiki/Coding-guideline) found in the wiki.

__Happy Hacking =)__
