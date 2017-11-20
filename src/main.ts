#!/usr/bin/env node
import * as cmd from "commander";
import { VERSION } from "./data-types/data-types";

import { createNewProject } from "./commands/create-new-project";
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
  .option( "--cpp [items]", "C++ project", source_files, [] )
  .action( ( command: string, project: string ) => {
    Object.assign( options, { command, project } );
  } )
  .parse( process.argv );

switch ( options.command ) {
  case "new":
    if ( cmd.cpp ) {
      console.log( "Creating C++ project" );
      createCppProject( cmd, options );
    } else {
      createNewProject( cmd, options );
    }
    break;
  default:
    console.log( "Unknown command, doing nothing!" );
}
