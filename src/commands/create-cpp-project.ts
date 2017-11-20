import * as sh from "shelljs";
import * as path from "path";
import * as fs from "fs";
import * as utils from "../lib/utils";
import * as os from "os";

import { getMain } from "./cpp/main";
import { getTestMain } from "./cpp/test.main";
import { getCMakeLists } from "./cpp/cmakelists";
import { getCMakeListsTest } from "./cpp/cmakelists.test";
import { getHeader } from "./cpp/header";
import { getSource } from "./cpp/source";
import { VERSION, GIT } from "../data-types/data-types";

const commit_message: string = `
This C++ Project was generated using Dev Mentor Tools (${ VERSION }).
Initial Commit.
`;

function safeCreateHeaderFile( filename: string ): void {
  if ( fs.existsSync( `./src/${ filename }` ) ) {
    return;
  }

  fs.writeFile( `./src/${ filename }`, getHeader( filename ), err => {
    if ( err ) {
      // log error, exit
      console.log( err.message );
      return;
    }
  } );
  console.log( `Created Header file: ${ filename }` );
}

function safeCreateSourceFile( filename: string ): void {
  if ( fs.existsSync( `./src/${ filename }` ) ) {
    return;
  }

  fs.writeFile( `./src/${ filename }`, getSource( filename ), err => {
    if ( err ) {
      // log error, exit
      console.log( err.message );
      return;
    }
  } );
  console.log( `Created Source file: ${ filename }` );
}

export function createCppProject( cmd: any, options: any ): void {

  if ( fs.existsSync( options.project ) ) {
    console.log( `Folder ${ options.project } already exists!` );
    return;
  }

  console.log( "DM-Tools is generating a new C++ project ..." );
  sh.cp( "-r", path.resolve( __dirname, "../../.templates/cpp/" ), `${ options.project }` );

  sh.pushd( `${ options.project }` );
  sh.mkdir( "docs", "include", "lib", "src", "build" );
  sh.mkdir( "src/include", "src/test", "src/test/include" );
  console.log( "Created project folders" );

  const header_files: string[] = [];

  cmd.cpp.forEach( file => {
    const header_file = file.replace( /\.cpp$/i, ".hpp" );
    header_files.push( header_file );
    safeCreateHeaderFile( header_file );
    safeCreateSourceFile( file );
  } );

  fs.writeFile( "./src/main.cpp", getMain( header_files ), err => {
    if ( err ) {
      console.log( err.message );
    }
  } );
  console.log( "Created main.cpp file" );

  fs.writeFile( "./src/CMakeLists.txt", getCMakeLists( options.project, header_files, cmd.cpp ), err => {
    if ( err ) {
      console.log( err.message );
    }
  } );
  console.log( "Created CMakefile file" );

  fs.writeFile( "./src/test/test.main.cpp", getTestMain(), err => {
    if ( err ) {
      console.log( err.message );
    }
  } );
  console.log( "Created test.main.cpp file" );

  fs.writeFile( "./src/test/CMakeLists.txt", getCMakeListsTest( options.project, header_files, cmd.cpp ), err => {
    if ( err ) {
      console.log( err.message );
    }
  } );
  console.log( "Created test CMakefile file" );

  utils.downloadFileHttps(
    "https://bitbucket.org/rajinder_yadav/micro_test/raw/master/src/include/micro-test.hpp",
    "./src/test/include/micro-test.hpp",
    function( err: any ) {
      if ( err ) {
        console.log( err.message );
      } else {
        console.log( "Downloaded Micro Test, the C++ Unit Test Framework" );
      }
    }
  );

  const cpp_build_type = ( cmd.debug || !cmd.release ) ? "Debug" : "Release";
  if ( cmd.release ) {
    console.log( "Release build" );
  } else {
    console.log( "Debug build" );
  }

  sh.pushd( "build" );
  switch ( os.type() ) {
    case "Linux":
      console.log( "Generating Makefiles for Linux" );
      if ( cmd.eclipse ) {
        console.log( "Creating Linux Eclipse CDT project files" );
        sh.exec( `cmake -G "Eclipse CDT4 - Unix Makefiles" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
      } else {
        console.log( "Creating Unix Makefiles" );
        sh.exec( `cmake -G "Unix Makefiles" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
      }
      break;

    case "Darwin":
      console.log( "Generating Makefiles for MacOS" );
      if ( cmd.eclipse ) {
        sh.exec( `cmake -G "Eclipse CDT4 - Unix Makefiles" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( "Created Eclipse CDT project files" );
      } else if ( cmd.xcode ) {
        sh.exec( `cmake -G "Xcode" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( "Created Xcode project files" );
      } else {
        sh.exec( `cmake -G "Unix Makefiles" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( "Created Unix Makefiles" );
      }
      break;

    case "Windows_NT":
      console.log( "Generating Makefiles for Windows" );
      sh.exec( `cmake -G \"NMake Makefiles\" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
      console.log( "Created VisualStudio project solution" );
      break;

    default:
      console.log( "WARNING: No Makefiles were created!" );
  }
  sh.popd();

  if ( GIT ) {
    console.log( "Creating a local Git repository and checked out to a dev branch" );
    sh.exec( "git init" );
    sh.exec( "git add -A" );
    sh.exec( `git commit -q -m "${ commit_message }"` );
    sh.exec( "git checkout -b dev" );
  }

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
