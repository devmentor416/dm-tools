import * as sh from "shelljs";
import * as path from "path";
import * as fs from "fs";
import * as utils from "../lib/utils";

import { getMain } from "./cpp/main";
import { getTestMain } from "./cpp/test.main";
import { getCMakeLists } from "./cpp/cmakelists";
import { getCMakeListsTest } from "./cpp/cmakelists.test";
import { getHeader } from "./cpp/header";
import { getSource } from "./cpp/source";

// import { VERSION } from "../data-types/data-types";

// const commit_message: string = `
// This Project was generated using Dev Mentor Tools (${ VERSION }).
// Initial Commit.
// `;

function safeCreateHeaderFile( filename: string ): void {
  if ( fs.existsSync( filename ) ) {
    return;
  }

  fs.writeFile( `./src/${ filename }`, getHeader( filename ), err => {
    if ( err ) {
      // exit
    }
  } );
}

function safeCreateSourceFile( filename: string ): void {
  if ( fs.existsSync( filename ) ) {
    return;
  }

  fs.writeFile( `./src/${ filename }`, getSource( filename ), err => {
    if ( err ) {
      // exit
    }
  } );
}

export function createCppProject( cmd: any, options: any ): void {

  if ( fs.existsSync( options.project ) ) {
    console.log( `Folder ${ options.project } already exists!` );
    return;
  }

  console.log( "DM-Tools is generating a new C++ project..." );
  sh.cp( "-r", path.resolve( __dirname, "../../.templates/cpp/" ), `${ options.project }` );

  sh.pushd( `${ options.project }` );
  sh.mkdir( "docs", "include", "lib", "src", "build" );
  sh.mkdir( "src/include", "src/test", "src/test/include" );

  const header_files: string[] = [];

  cmd.cpp.forEach( file => {
    const header_file = file.replace( /\.cpp$/i, ".hpp" );
    header_files.push( header_file );
    safeCreateHeaderFile( header_file );
    safeCreateSourceFile( file );
  } );

  console.log( "Creating main.cpp file" );
  fs.writeFile( "./src/main.cpp", getMain( header_files ), err => {
    if ( err ) {
      // exit
    }
  } );

  console.log( "Creating CMakefile file" );
  fs.writeFile( "./src/CMakeLists.txt", getCMakeLists( options.project, header_files, cmd.cpp ), err => {
    if ( err ) {
      // exit
    }
  } );
  console.log( "Creating test.main.cpp file" );
  fs.writeFile( "./src/test/test.main.cpp", getTestMain(), err => {
    if ( err ) {
      // exit
    }
  } );
  console.log( "Creating test CMakefile file" );
  fs.writeFile( "./src/test/CMakeLists.txt", getCMakeListsTest( options.project, header_files, cmd.cpp ), err => {
    if ( err ) {
      // exit
    }
  } );

  utils.downloadFileHttps(
    "https://bitbucket.org/rajinder_yadav/micro_test/raw/master/src/include/micro-test.hpp",
    "./src/test/include/micro-test.hpp",
    function( err: any ) {
      if ( err ) {
        console.log( err.message );
      } else {
        console.log( "Downloaded Micro Test." );
      }
    }
  );

  sh.pushd( "build" );
  sh.exec( "cmake -G \"Unix Makefiles\" -D CMAKE_BUILD_TYPE=Debug ../src" );
  sh.popd();
  // sh.exec( "git init" );
  // sh.exec( "git add -A" );
  // sh.exec( `git commit -q -m "${ commit_message }"` );
  // sh.exec( "git checkout -b dev" );

  // Also need to take into consideration different platforms: Win, MacOS, Linux 32/64.

  // Set up end to end testing.
  // if ( !cmd.e2e ) {
  //   sh.mkdir( "bin_tools" );

  //   // Download Chromedriver.
  //   utils.downloadFileHttps( "https://chromedriver.storage.googleapis.com/2.33/chromedriver_mac64.zip",
  //     "./bin_tools/chromedriver_mac64.zip",
  //     function( err: any ) {
  //       if ( err ) {
  //         console.log( err.message );
  //       } else {
  //         console.log( "Downloaded Chromedriver." );
  //         sh.pushd( `${ options.project }/bin_tools` );
  //         sh.exec( "unzip chromedriver_mac64.zip" );
  //         sh.rm( "chromedriver_mac64.zip" );
  //         sh.popd();
  //       }
  //     } );

  //   // Download standalone selenium-server.
  //   utils.downloadFileHttp( "http://selenium-release.storage.googleapis.com/3.7/selenium-server-standalone-3.7.1.jar",
  //     "./bin_tools/selenium-server-standalone-3.7.1.jar",
  //     function( err: any ) {
  //       if ( err ) {
  //         console.log( err.message );
  //       } else {
  //         console.log( "Downloaded Selenium server." );
  //       }
  //     } );
  // }

  sh.popd();
  console.log( `Project ${ options.project } created successfully.` );
}
