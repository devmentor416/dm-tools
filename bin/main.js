#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cmd = require("commander");
const data_types_1 = require("./data-types/data-types");
const fs = require("fs");
const create_js_project_1 = require("./commands/create-js-project");
const create_cpp_project_1 = require("./commands/create-cpp-project");
const options = {};
const config_file = process.env.HOME + '/dmtools.json';
function source_files(files) {
    return files.split(',');
}
let config = { project: {} };
if (fs.existsSync(config_file)) {
    config = JSON.parse(fs.readFileSync(config_file, 'utf8'));
}
Object.assign(options, { config });
cmd
    .version(`DevMentor Tools Project Generator v${data_types_1.VERSION}`, '-v, --version')
    .usage('<command> <project> [options...]\n\n     commands: new')
    .arguments('<command> <project>')
    .option('-t, --type <type>', 'project types: ts, node, js')
    .option('--e2e', 'end to end testing')
    .option('-w, --web', 'simple static Web setup')
    .option('--cpp [items]', 'C++ project', source_files)
    .option('-D, --debug', 'debug build')
    .option('--release', 'debug build')
    .option('-M, --make', 'Unix Makefile build')
    .option('--xcode', 'XCode Makefile')
    .option('--eclipse', 'Eclipse CDT4 Makefile')
    .option('-N, --nmake', 'Window NMak Makefile')
    .action((command, project) => {
    Object.assign(options, { command, project });
})
    .on('--help', () => {
    console.log(`\nDev Mentor DM-Tools
Create C++, TypeScript and JavaScript projects.\n
Website: https://www.npmjs.com/package/dm-tools
    `);
})
    .parse(process.argv);
switch (options.command) {
    case 'new':
        if (cmd.cpp) {
            create_cpp_project_1.createCppProject(cmd, options);
        }
        else {
            create_js_project_1.createJSProject(cmd, options);
        }
        break;
    default:
        console.log('Unknown Command, doing nothing!');
}
//# sourceMappingURL=/home/yadav/dev/projects/devmentor-tools/main.js.map