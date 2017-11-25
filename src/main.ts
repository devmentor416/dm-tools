#!/usr/bin/env node
"use strict";
import * as cmd from "commander";
import { VERSION } from "./data-types/data-types";

import { createJSProject } from "./commands/create-js-project";
import { createCppProject } from "./commands/create-cpp-project";

const options: any = {};

function source_files( files: string ) {
  return files.split( "," );
}

cmd
  .version( `${ VERSION }` )
  .usage( "<command> <project> [options...]" )
  .arguments( "<command> <project>" )
  .option( "-t, --type <type>", "project types: ts, node, js" )
  .option( "--e2e", "end to end testing" )
  .option( "-w, --web", "simple static Web setup" )
  .option( "--cpp [items]", "C++ project", source_files )
  .option( "-D, --debug", "debug build" )
  .option( "--release", "debug build" )
  .option( "-M, --make", "Unix Makefile build" )
  .option( "--xcode", "XCode Makefile" )
  .option( "--eclipse", "Eclipse CDT4 Makefile" )
  .option( "-N, --nmake", "Window NMak Makefile" )
  .action( ( command: string, project: string ) => {
    Object.assign( options, { command, project } );
  } )
  .on( "--help", () => {
    console.log( `\nDev Mentor DM-Tools
Create C++, TypeScript and JavaScript projects.\n
Website: https://www.npmjs.com/package/dm-tools
    `);
  } )
  .parse( process.argv );


switch ( options.command ) {
  case "new":
    if ( cmd.cpp ) {
      createCppProject( cmd, options );
    } else {
      createJSProject( cmd, options );
    }
    break;
  default:
    console.log( "Unknown Command, doing nothing!" );
}
