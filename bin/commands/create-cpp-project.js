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
exports.createCppProject = void 0;
const sh = __importStar(require("shelljs"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const utils = __importStar(require("../lib/utils"));
const os = __importStar(require("os"));
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
function safeCreateHeaderFile(filename, options) {
    if (fs.existsSync(`./src/${filename}`)) {
        console.log('Header file already exist, skipping!');
        return;
    }
    fs.writeFile(`./src/${filename}`, (0, header_1.getTemplateHeader)(filename, options.config), (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
    });
    console.log(`Created Header file: ${filename}`);
}
function safeCreateSourceFile(filename, options) {
    if (fs.existsSync(`./src/${filename}`)) {
        console.log('Source file already exist, skipping!');
        return;
    }
    fs.writeFile(`./src/${filename}`, (0, source_1.getTemplateSource)(filename, options.config), (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
    });
    console.log(`Created Source file: ${filename}`);
}
function createCppProject(options) {
    if (fs.existsSync(options.project)) {
        console.log(`Folder ${options.project} already exists, doing nothing!`);
        return;
    }
    console.log('DM-Tools is generating a new C++ project ...');
    sh.cp('-r', path.resolve(__dirname, '../../.templates/cpp/'), `${options.project}`);
    sh.pushd(`${options.project}`);
    sh.mkdir('docs', 'include', 'lib', 'src', 'build');
    sh.mkdir('src/include', 'src/test', 'src/test/include');
    console.log('Created project folders');
    const header_files = [];
    let source_files = [];
    if (options.cpp instanceof Array) {
        source_files = options.cpp;
        options.cpp.forEach((file) => {
            const header_file = file.replace(/\.cpp$/i, '.hpp');
            header_files.push(header_file);
            safeCreateHeaderFile(header_file, options);
            safeCreateSourceFile(file, options);
        });
    }
    fs.writeFile('./src/main.cpp', (0, main_1.getTemplateMain)(header_files, options), (err) => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log('Created main.cpp file');
    fs.writeFile('./src/CMakeLists.txt', (0, cmakelists_1.getTemplateCMakeLists)(options.project, header_files, source_files, options.config), (err) => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log('Created CMakefile file');
    fs.writeFile('./src/test/test.main.cpp', (0, test_main_1.getTemplateTestMain)(options), (err) => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log('Created test.main.cpp file');
    fs.writeFile('./src/test/CMakeLists.txt', (0, cmakelists_test_1.getTemplateCMakeListsTest)(options.project, header_files, source_files, options.config), (err) => {
        if (err) {
            console.log(err.message);
        }
    });
    console.log('Created Unit Test CMakefile file');
    utils.downloadFileHttps('https://bitbucket.org/rajinder_yadav/micro_test/raw/master/src/include/micro-test.hpp', `${process.cwd()}/src/test/include/micro-test.hpp`, function (err) {
        if (err) {
            console.log('ERROR> Download failed');
            console.log(err.message);
        }
        else {
            console.log('Downloaded Micro Test, the C++ Unit Test Framework');
        }
    });
    const cpp_build_type = options.debug || !options.release ? 'Debug' : 'Release';
    if (options.release) {
        console.log('Release build');
    }
    else {
        console.log('Debug build');
    }
    sh.pushd('build');
    switch (os.type()) {
        case 'Linux':
            console.log('Generating Makefiles for Linux');
            if (options.eclipse) {
                sh.exec(`cmake -G "Eclipse CDT4 - Unix Makefiles" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log('Created Linux Eclipse CDT project files');
            }
            else {
                sh.exec(`cmake -G "Unix Makefiles" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log('Created Unix Makefiles');
            }
            break;
        case 'Darwin':
            console.log('Generating Makefiles for MacOS');
            if (options.eclipse) {
                sh.exec(`cmake -G 'Eclipse CDT4 - Unix Makefiles' -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log('Created Eclipse CDT project files');
            }
            else if (options.xcode) {
                sh.exec(`cmake -G 'Xcode' -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log('Created Xcode project files');
            }
            else {
                sh.exec(`cmake -G 'Unix Makefiles' -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
                console.log('Created Unix Makefiles');
            }
            break;
        case 'Windows_NT':
            console.log('Generating Makefiles for Windows');
            sh.exec(`cmake -G "NMake Makefiles" -D CMAKE_BUILD_TYPE=${cpp_build_type} ../src`);
            console.log('Created VisualStudio project solution');
            break;
        default:
            console.log('WARNING: No Makefiles were created!');
    }
    sh.popd();
    if (data_types_1.GIT) {
        console.log('Creating a local Git repository and checked out to a dev branch');
        sh.exec('git init');
        sh.exec('git add -A');
        sh.exec(`git commit -q -m "${commit_message}"`);
        sh.exec('git checkout -b dev');
    }
    sh.popd();
    console.log(`Project ${options.project} created successfully.`);
}
exports.createCppProject = createCppProject;
