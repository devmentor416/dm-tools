'use strict';
import * as sh from 'shelljs';
import * as path from 'path';
import * as fs from 'fs';
import * as utils from '../lib/utils';
import * as os from 'os';

import { getTemplateMain } from './cpp/main';
import { getTemplateTestMain } from './cpp/test-main';
import { getTemplateCMakeLists } from './cpp/cmakelists';
import { getTemplateCMakeListsTest } from './cpp/cmakelists.test';
import { getTemplateHeader } from './cpp/header';
import { getTemplateSource } from './cpp/source';
import { VERSION, GIT } from '../data-types/data-types';
import { Options } from './cpp/types';

const commit_message = `
This C++ Project was generated using Dev Mentor Tools (${ VERSION }).
Initial Commit.
`;

function safeCreateHeaderFile( filename: string, options: Options ): void {
  if ( fs.existsSync( `./src/${ filename }` ) ) {
    console.log( 'Header file already exist, skipping!' );
    return;
  }

  fs.writeFile( `./src/${ filename }`, getTemplateHeader( filename, options.config ), ( err ) => {
    if ( err ) {
      console.log( err.message );
      return;
    }
  } );
  console.log( `Created Header file: ${ filename }` );
}

function safeCreateSourceFile( filename: string, options: Options ): void {
  if ( fs.existsSync( `./src/${ filename }` ) ) {
    console.log( 'Source file already exist, skipping!' );
    return;
  }

  fs.writeFile( `./src/${ filename }`, getTemplateSource( filename, options.config ), ( err ) => {
    if ( err ) {
      console.log( err.message );
      return;
    }
  } );
  console.log( `Created Source file: ${ filename }` );
}

export function createCppProject( options: Options ): void {
  if ( fs.existsSync( options.project ) ) {
    console.log( `Folder ${ options.project } already exists, doing nothing!` );
    return;
  }

  console.log( 'DM-Tools is generating a new C++ project ...' );
  sh.cp( '-r', path.resolve( __dirname, '../../.templates/cpp/' ), `${ options.project }` );

  sh.pushd( `${ options.project }` );
  sh.mkdir( 'docs', 'include', 'lib', 'src', 'build' );
  sh.mkdir( 'src/include', 'src/test', 'src/test/include' );
  console.log( 'Created project folders' );

  const header_files: string[] = [];
  let source_files: string[] = [];

  if ( options.cpp instanceof Array ) {
    source_files = options.cpp;
    options.cpp.forEach( ( file: string ) => {
      const header_file = file.replace( /\.cpp$/i, '.hpp' );
      header_files.push( header_file );
      safeCreateHeaderFile( header_file, options );
      safeCreateSourceFile( file, options );
    } );
  }

  fs.writeFile( './src/main.cpp', getTemplateMain( header_files, options ), ( err ) => {
    if ( err ) {
      console.log( err.message );
    }
  } );
  console.log( 'Created main.cpp file' );

  fs.writeFile(
    './src/CMakeLists.txt',
    getTemplateCMakeLists( options.project, header_files, source_files, options.config ),
    ( err ) => {
      if ( err ) {
        console.log( err.message );
      }
    }
  );
  console.log( 'Created CMakefile file' );

  fs.writeFile( './src/test/test.main.cpp', getTemplateTestMain( options ), ( err ) => {
    if ( err ) {
      console.log( err.message );
    }
  } );
  console.log( 'Created test.main.cpp file' );

  fs.writeFile(
    './src/test/CMakeLists.txt',
    getTemplateCMakeListsTest( options.project, header_files, source_files, options.config ),
    ( err ) => {
      if ( err ) {
        console.log( err.message );
      }
    }
  );
  console.log( 'Created Unit Test CMakefile file' );

  utils.downloadFileHttps(
    'https://bitbucket.org/rajinder_yadav/micro_test/raw/master/src/include/micro-test.hpp',
    `${ process.cwd() }/src/test/include/micro-test.hpp`,
    function( err?: { message: string } ) {
      if ( err ) {
        console.log( 'ERROR> Download failed' );
        console.log( err.message );
      } else {
        console.log( 'Downloaded Micro Test, the C++ Unit Test Framework' );
      }
    }
  );

  const cpp_build_type = options.debug || !options.release ? 'Debug' : 'Release';
  if ( options.release ) {
    console.log( 'Release build' );
  } else {
    console.log( 'Debug build' );
  }

  sh.pushd( 'build' );
  switch ( os.type() ) {
    case 'Linux':
      console.log( 'Generating Makefiles for Linux' );
      if ( options.eclipse ) {
        sh.exec( `cmake -G "Eclipse CDT4 - Unix Makefiles" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( 'Created Linux Eclipse CDT project files' );
      } else {
        sh.exec( `cmake -G "Unix Makefiles" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( 'Created Unix Makefiles' );
      }
      break;

    case 'Darwin':
      console.log( 'Generating Makefiles for MacOS' );
      if ( options.eclipse ) {
        sh.exec( `cmake -G 'Eclipse CDT4 - Unix Makefiles' -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( 'Created Eclipse CDT project files' );
      } else if ( options.xcode ) {
        sh.exec( `cmake -G 'Xcode' -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( 'Created Xcode project files' );
      } else {
        sh.exec( `cmake -G 'Unix Makefiles' -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
        console.log( 'Created Unix Makefiles' );
      }
      break;

    case 'Windows_NT':
      console.log( 'Generating Makefiles for Windows' );
      sh.exec( `cmake -G "NMake Makefiles" -D CMAKE_BUILD_TYPE=${ cpp_build_type } ../src` );
      console.log( 'Created VisualStudio project solution' );
      break;

    default:
      console.log( 'WARNING: No Makefiles were created!' );
  }
  sh.popd();

  if ( GIT ) {
    console.log( 'Creating a local Git repository and checked out to a dev branch' );
    sh.exec( 'git init' );
    sh.exec( 'git add -A' );
    sh.exec( `git commit -q -m "${ commit_message }"` );
    sh.exec( 'git checkout -b dev' );
  }

  // Also need to take into consideration different platforms: Win, MacOS, Linux 32/64.

  // Set up end to end testing.
  // if ( !options.e2e ) {
  //   sh.mkdir( 'bin_tools' );

  //   // Download Chromedriver.
  //   utils.downloadFileHttps( 'https://chromedriver.storage.googleapis.com/2.33/chromedriver_mac64.zip',
  //     './bin_tools/chromedriver_mac64.zip',
  //     function( err ) {
  //       if ( err ) {
  //         console.log( err.message );
  //       } else {
  //         console.log( 'Downloaded Chromedriver.' );
  //         sh.pushd( `${ options.project }/bin_tools` );
  //         sh.exec( 'unzip chromedriver_mac64.zip' );
  //         sh.rm( 'chromedriver_mac64.zip' );
  //         sh.popd();
  //       }
  //     } );

  //   // Download standalone selenium-server.
  //   utils.downloadFileHttp( 'http://selenium-release.storage.googleapis.com/3.7/selenium-server-standalone-3.7.1.jar',
  //     './bin_tools/selenium-server-standalone-3.7.1.jar',
  //     function( err ) {
  //       if ( err ) {
  //         console.log( err.message );
  //       } else {
  //         console.log( 'Downloaded Selenium server.' );
  //       }
  //     } );
  // }

  sh.popd();
  console.log( `Project ${ options.project } created successfully.` );
}
