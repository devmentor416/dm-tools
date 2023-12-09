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
exports.createJSProject = void 0;
const sh = __importStar(require("shelljs"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const data_types_1 = require("../data-types/data-types");
const commit_message = `
This Project was generated using Dev Mentor Tools (${data_types_1.VERSION}).
Initial Commit.
`;
function createJSProject(options) {
    if (fs.existsSync(options.project)) {
        console.log(`Folder ${options.project} already exists!`);
        return;
    }
    switch (options.type) {
        case 'ts': {
            console.log('DM-Tools is generating a new TypeScript Node.js Server, static Web site project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/typescript/'), `${options.project}`);
            break;
        }
        case 'node': {
            console.log('DM-Tools is generating a TypeScript Node.js Server project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/node/'), `${options.project}`);
            break;
        }
        case 'koa': {
            console.log('DM-Tools is generating a JavaScript Koa Server project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/koa/'), `${options.project}`);
            break;
        }
        case 'gql': {
            console.log('DM-Tools is generating a TypeScript Apollo GraphQL Server project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/apollo-graphql-server/'), `${options.project}`);
            break;
        }
        case 'js': {
            console.log('DM-Tools is generating a JavaScript Node.js Server project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/javascript/'), `${options.project}`);
            break;
        }
        case 'web': {
            console.log('DM-Tools is generating a Static Website project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/web/'), `${options.project}`);
            break;
        }
        default: {
            console.log('DM-Tools is generating a TypeScript project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/default/'), `${options.project}`);
        }
    }
    sh.pushd(`${options.project}`);
    sh.mkdir('docs', 'logs');
    sh.exec('git init');
    sh.exec('git add -A');
    sh.exec(`git commit -q -m "${commit_message}"`);
    sh.exec('git checkout -b dev');
    if (data_types_1.YARN) {
        sh.exec('yarn');
    }
    else {
        sh.exec('npm install');
    }
    if (options.e2e) {
        if (data_types_1.YARN) {
            sh.exec('yarn add cypress -D');
        }
        else {
            sh.exec('npm i -D cypress');
        }
    }
    try {
        if (process.env.EDITOR) {
            fs.accessSync(process.env.EDITOR, fs.constants.F_OK);
            sh.exec(`${process.env.EDITOR} .`);
        }
    }
    catch (err) {
        console.error('Unable to locate an Editor to open.');
        console.error('Please set Environment var EDITOR to point to the editor to use.');
    }
    sh.popd();
    console.log(`Project ${options.project} created successfully.`);
}
exports.createJSProject = createJSProject;
