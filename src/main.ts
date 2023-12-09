#!/usr/bin/env node
'use strict';
import { Command } from 'commander';
import { VERSION } from './data-types/data-types';
import * as fs from 'fs';

import { createJSProject } from './commands/create-js-project';
import { createCppProject } from './commands/create-cpp-project';
import { Options } from './commands/cpp/types';

const options: Options = {
  command: '',
  project: '',
  config: { author: '', email: '', project: { copyholder: '', license: '', cmake: '' } },
};
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

let config = { project: {} };
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

const cmd_opts = cmd.opts();

Object.assign( options, {
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
} );

console.log( `DEBUG> ${ JSON.stringify( options ) }` );

switch ( options[ 'command' ] ) {
  case 'new':
    if ( options?.cpp ) {
      createCppProject( options );
    } else {
      createJSProject( options );
    }
    break;
  default:
    console.log( 'Unknown Command, doing nothing!' );
}
