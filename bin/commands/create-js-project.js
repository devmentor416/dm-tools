'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sh = require("shelljs");
const path = require("path");
const fs = require("fs");
const data_types_1 = require("../data-types/data-types");
const commit_message = `
This Project was generated using Dev Mentor Tools (${data_types_1.VERSION}).
Initial Commit.
`;
function createJSProject(cmd, options) {
    if (fs.existsSync(options.project)) {
        console.log(`Folder ${options.project} already exists!`);
        return;
    }
    switch (cmd.type) {
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
        case 'graphql': {
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
            console.log('DM-Tools is generating a JavaScript Node.js Server project...');
            sh.cp('-r', path.resolve(__dirname, '../../.templates/javascript/'), `${options.project}`);
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
    if (cmd.e2e) {
        if (data_types_1.YARN) {
            sh.exec('yarn add cypress -D');
        }
        else {
            sh.exec('npm i -D cypress');
        }
    }
    sh.popd();
    console.log(`Project ${options.project} created successfully.`);
}
exports.createJSProject = createJSProject;
//# sourceMappingURL=../../src/commands/create-js-project.js.map