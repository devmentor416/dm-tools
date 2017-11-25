#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cmd = require("commander");
const data_types_1 = require("./data-types/data-types");
const create_js_project_1 = require("./commands/create-js-project");
const create_cpp_project_1 = require("./commands/create-cpp-project");
const options = {};
function source_files(files) {
    return files.split(",");
}
cmd
    .version(`${data_types_1.VERSION}`)
    .usage("<command> <project> [options...]")
    .arguments("<command> <project>")
    .option("-t, --type <type>", "project types: ts, node, js")
    .option("--e2e", "end to end testing")
    .option("-w, --web", "simple static Web setup")
    .option("--cpp [items]", "C++ project", source_files)
    .option("-D, --debug", "debug build")
    .option("--release", "debug build")
    .option("-M, --make", "Unix Makefile build")
    .option("--xcode", "XCode Makefile")
    .option("--eclipse", "Eclipse CDT4 Makefile")
    .option("-N, --nmake", "Window NMak Makefile")
    .action((command, project) => {
    Object.assign(options, { command, project });
})
    .on("--help", () => {
    console.log(`\nDev Mentor DM-Tools
Create C++, TypeScript and JavaScript projects.\n
Website: https://www.npmjs.com/package/dm-tools
    `);
})
    .parse(process.argv);
switch (options.command) {
    case "new":
        if (cmd.cpp) {
            create_cpp_project_1.createCppProject(cmd, options);
        }
        else {
            create_js_project_1.createJSProject(cmd, options);
        }
        break;
    default:
        console.log("Unknown Command, doing nothing!");
}
//# sourceMappingURL=main.js.map