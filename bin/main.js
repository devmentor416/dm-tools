#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cmd = require("commander");
const data_types_1 = require("./data-types/data-types");
const create_new_project_1 = require("./commands/create-new-project");
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
    .option("--cpp [items]", "C++ project", source_files, [])
    .action((command, project) => {
    Object.assign(options, { command, project });
})
    .parse(process.argv);
switch (options.command) {
    case "new":
        if (cmd.cpp) {
            console.log("Creating C++ project");
            create_cpp_project_1.createCppProject(cmd, options);
        }
        else {
            create_new_project_1.createNewProject(cmd, options);
        }
        break;
    default:
        console.log("Unknown command, doing nothing!");
}
//# sourceMappingURL=main.js.map