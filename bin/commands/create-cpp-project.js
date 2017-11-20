"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sh = require("shelljs");
const path = require("path");
const fs = require("fs");
const utils = require("../lib/utils");
const main_1 = require("./cpp/main");
const test_main_1 = require("./cpp/test.main");
const cmakelists_1 = require("./cpp/cmakelists");
const cmakelists_test_1 = require("./cpp/cmakelists.test");
const header_1 = require("./cpp/header");
const source_1 = require("./cpp/source");
function safeCreateHeaderFile(filename) {
    if (fs.existsSync(filename)) {
        return;
    }
    fs.writeFile(`./src/${filename}`, header_1.getHeader(filename), err => {
        if (err) {
        }
    });
}
function safeCreateSourceFile(filename) {
    if (fs.existsSync(filename)) {
        return;
    }
    fs.writeFile(`./src/${filename}`, source_1.getSource(filename), err => {
        if (err) {
        }
    });
}
function createCppProject(cmd, options) {
    if (fs.existsSync(options.project)) {
        console.log(`Folder ${options.project} already exists!`);
        return;
    }
    console.log("DM-Tools is generating a new C++ project...");
    sh.cp("-r", path.resolve(__dirname, "../../.templates/cpp/"), `${options.project}`);
    sh.pushd(`${options.project}`);
    sh.mkdir("docs", "include", "lib", "src", "build");
    sh.mkdir("src/include", "src/test", "src/test/include");
    const header_files = [];
    cmd.cpp.forEach(file => {
        const header_file = file.replace(/\.cpp$/i, ".hpp");
        header_files.push(header_file);
        safeCreateHeaderFile(header_file);
        safeCreateSourceFile(file);
    });
    console.log("Creating main.cpp file");
    fs.writeFile("./src/main.cpp", main_1.getMain(header_files), err => {
        if (err) {
        }
    });
    console.log("Creating CMakefile file");
    fs.writeFile("./src/CMakeLists.txt", cmakelists_1.getCMakeLists(options.project, header_files, cmd.cpp), err => {
        if (err) {
        }
    });
    console.log("Creating test.main.cpp file");
    fs.writeFile("./src/test/test.main.cpp", test_main_1.getTestMain(), err => {
        if (err) {
        }
    });
    console.log("Creating test CMakefile file");
    fs.writeFile("./src/test/CMakeLists.txt", cmakelists_test_1.getCMakeListsTest(options.project, header_files, cmd.cpp), err => {
        if (err) {
        }
    });
    utils.downloadFileHttps("https://bitbucket.org/rajinder_yadav/micro_test/raw/master/src/include/micro-test.hpp", "./src/test/include/micro-test.hpp", function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Downloaded Micro Test.");
        }
    });
    sh.pushd("build");
    sh.exec("cmake -G \"Unix Makefiles\" -D CMAKE_BUILD_TYPE=Debug ../src");
    sh.popd();
    sh.popd();
    console.log(`Project ${options.project} created successfully.`);
}
exports.createCppProject = createCppProject;
//# sourceMappingURL=create-cpp-project.js.map