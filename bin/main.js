#!/usr/bin/env node
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const data_types_1 = require("./data-types/data-types");
const fs = __importStar(require("fs"));
const create_js_project_1 = require("./commands/create-js-project");
const create_cpp_project_1 = require("./commands/create-cpp-project");
const options = {
    command: '',
    project: '',
    config: { author: '', email: '', project: { copyholder: '', license: '', cmake: '' } },
};
const config_file = process.env.HOME + '/dmtools.json';
function source_files(files) {
    return files.split(',');
}
const cmd = new commander_1.Command();
let config = { project: {} };
if (fs.existsSync(config_file)) {
    config = JSON.parse(fs.readFileSync(config_file, 'utf8'));
}
Object.assign(options, { config });
cmd
    .version(`DevMentor Tools Project Generator v${data_types_1.VERSION}`, '-v, --version', 'Show current version')
    .usage('<command> <project> [options...]\n\n     commands: new')
    .arguments('<command> <project>')
    .option('-t, --type <type>', 'project types: gql, js, koa, node, ts, web')
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
const cmd_opts = cmd.opts();
Object.assign(options, {
    type: cmd_opts.type,
    e2e: cmd_opts.e2e,
    web: cmd_opts.web,
    cpp: cmd_opts.cpp,
    debug: cmd_opts.debug,
    release: cmd_opts.release,
    eclipse: cmd_opts.eclipse,
    xcode: cmd_opts.xcode,
    nmake: cmd_opts.nmake,
    make: cmd_opts.make,
});
console.log(`DEBUG> ${JSON.stringify(options)}`);
switch (options['command']) {
    case 'new':
        if (options?.cpp) {
            (0, create_cpp_project_1.createCppProject)(options);
        }
        else {
            (0, create_js_project_1.createJSProject)(options);
        }
        break;
    default:
        console.log('Unknown Command, doing nothing!');
}
