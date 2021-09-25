#!/usr/bin/env node
'use strict';
import { Command } from 'commander';
import { VERSION } from './data-types/data-types';
import * as fs from 'fs';

import { createJSProject } from './commands/create-js-project';
// import { createCppProject } from './commands/create-cpp-project';

const options: any = {};
const config_file = process.env.HOME + '/dmtools.json';

function source_files( files: string ) {
  return files.split( ',' );
}

/* dm-tools configuration schema
{
  "author": "Rajinder Yadav",
  "email": "devguy.ca@gmail.com",
  "project": {
    "cmake": 2.6,
    "copyholder": "Dev Mentor, Rajinder Yadav",
    "license": "GNU Public License (GNU GPL)"
  }
}
*/
const cmd = new Command();

let config: any = { project: {} };
if ( fs.existsSync( config_file ) ) {
  config = JSON.parse( fs.readFileSync( config_file, 'utf8' ) );
}
Object.assign( options, { config } );


cmd
  .version( `DevMentor Tools Project Generator v${ VERSION }`, '-v, --version', 'Show current version' )
  .usage( '<command> <project> [options...]\n\n     commands: new' )
  .arguments( '<command> <project>' )
  .option( '-t, --type <type>', 'project types: gql, js, koa, node, ts, web' )
  .option( '--e2e', 'end to end testing' )
  .option( '-w, --web', 'simple static Web setup' )
  .option( '--cpp [items]', 'C++ project', source_files )
  .option( '-D, --debug', 'debug build' )
  .option( '--release', 'debug build' )
  .option( '-M, --make', 'Unix Makefile build' )
  .option( '--xcode', 'XCode Makefile' )
  .option( '--eclipse', 'Eclipse CDT4 Makefile' )
  .option( '-N, --nmake', 'Window NMak Makefile' )
  .action( ( command: string, project: string ) => {
    Object.assign( options, { command, project } );
  } )
  .on( '--help', () => {
    console.log( `\nDev Mentor DM-Tools
Create C++, TypeScript and JavaScript projects.\n
Website: https://www.npmjs.com/package/dm-tools
    `);
  } )
  .parse( process.argv );

createJSProject( cmd.opts(), options );

// switch ( options.command ) {
// case 'new':
//   if ( options.cpp ) {
//     createCppProject( options );
//   } else {
//     createJSProject( options );
//   }
// break;
//   default:
// console.log( 'Unknown Command, doing nothing!' );
// }
