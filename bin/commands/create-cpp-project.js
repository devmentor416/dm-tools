"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sh = require("shelljs");
const path = require("path");
const fs = require("fs");
const utils = require("../lib/utils");
const os = require("os");
const main_1 = require("./cpp/main");
const test_main_1 = require("./cpp/test-main");
const cmakelists_1 = require("./cpp/cmakelists");
const cmakelists_test_1 = require("./cpp/cmakelists.test");
const header_1 = require("./cpp/header");
const source_1 = require("./cpp/source");
const data_types_1 = require("../data-types/data-types");
const commit_message = `
This C++ Project was generated using Dev Mentor Tools (${data_types_1.VERSION}).
Initial Commit.
`;
function safeCreateHeaderFile(filename) {
    if (fs.existsSync(`./src/${filename}`)) {
        console.log("Header file already exist, skipping!");
        return;
    }
    fs.writeFile(`./src/${filename}`, header_1.getTemplateHeader(filename), err => {
        if (err) {
            console.log(err.message);
            return;
        }
    });
    console.log(`Created Header file: ${filename}`);
}
function safeCreateSourceFile(filename) {
    if (fs.existsSync(`./src/${filename}`)) {
        console.log("Source file already exist, skipping!");
        return;
    }
    fs.writeFile(`./src/${filename}`, source_1.getTemplateSource(filename), err => {
        if (err) {
            console.log(err.message);
            return;
        }
    });
    console.log(`Created Source file: ${filename}`);
}
function createCppProject(cmd, options) {
    if (fs.existsSync(options.project)) {
        console.log(`Folder ${options.project} already exists, doing nothing!`);
        return;
    }
    console.log("DM-Tools is generating a new C++ project ...");
    sh.cp("-r", path.resolve(__dirname, "../../.templates/cpp/"), `${options.project}`);
    sh.pushd(`${options.project}`);
    sh.mkdir("docs", "include", "lib", "src", "build");
    sh.mkdir("src/include", "src/test", "src/test/include");
    console.log("Created project folders");
    const header_files = [];
    cmd.cpp.forEach((file) => {
        const header_file = file.replace(/\.cpp$/i, ".hpp");
        header_files.push(header_file);
        safeCreateHeaderFile(header_file);
        safeCreateSourceFile(file);
    });
    fs.writeFile("./src/main.cpp", main_1.getTemplateMain(header_files), err => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log("Created main.cpp file");
    fs.writeFile("./src/CMakeLists.txt", cmakelists_1.getTemplateCMakeLists(options.project, header_files, cmd.cpp), err => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log("Created CMakefile file");
    fs.writeFile("./src/test/test.main.cpp", test_main_1.getTemplateTestMain(), err => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log("Created test.main.cpp file");
    fs.writeFile("./src/test/CMakeLists.txt", cmakelists_test_1.getTemplateCMakeListsTest(options.project, header_files, cmd.cpp), err => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log("Created Unit Test CMakefile file");
    utils.downloadFileHttps("https://bitbucket.org/rajinder_yadav/micro_test/raw/master/src/include/micro-test.hpp", "./src/test/include/micro-test.hpp", function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Downloaded Micro Test, the C++ Unit Test Framework");
        }
    });
    const cpp_build_type = (cmd.debug || !cmd.release) ? "Debug" : "Release";
    if (cmd.release) {
        console.log("Release build");
    }
    else {
        console.log("Debug build");
    }
    sh.pushd("build");
    switch (os.type()) {
        case "Linux":
            console.log("Generating Makefiles for Linux");
            if (cmd.eclipse) {
                sh.exec(`cmake -G "Eclipse CDT4 - Unix Makefiles" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log("Created Linux Eclipse CDT project files");
            }
            else {
                sh.exec(`cmake -G "Unix Makefiles" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log("Created Unix Makefiles");
            }
            break;
        case "Darwin":
            console.log("Generating Makefiles for MacOS");
            if (cmd.eclipse) {
                sh.exec(`cmake -G "Eclipse CDT4 - Unix Makefiles" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log("Created Eclipse CDT project files");
            }
            else if (cmd.xcode) {
                sh.exec(`cmake -G "Xcode" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log("Created Xcode project files");
            }
            else {
                sh.exec(`cmake -G "Unix Makefiles" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log("Created Unix Makefiles");
            }
            break;
        case "Windows_NT":
            console.log("Generating Makefiles for Windows");
            sh.exec(`cmake -G \"NMake Makefiles\" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
            console.log("Created VisualStudio project solution");
            break;
        default:
            console.log("WARNING: No Makefiles were created!");
    }
    sh.popd();
    if (data_types_1.GIT) {
        console.log("Creating a local Git repository and checked out to a dev branch");
        sh.exec("git init");
        sh.exec("git add -A");
        sh.exec(`git commit -q -m "${commit_message}"`);
        sh.exec("git checkout -b dev");
    }
    sh.popd();
    console.log(`Project ${options.project} created successfully.`);
}
exports.createCppProject = createCppProject;
//# sourceMappingURL=create-cpp-project.js.map