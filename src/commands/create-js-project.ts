'use strict';
import * as sh from 'shelljs';
import * as path from 'path';
import * as fs from 'fs';
// import * as utils from '../lib/utils';

import { VERSION, YARN } from '../data-types/data-types';

const commit_message: string = `
This Project was generated using Dev Mentor Tools (${ VERSION }).
Initial Commit.
`;

export function createJSProject( flags: any, options: any ): void {

  if ( fs.existsSync( options.project ) ) {
    console.log( `Folder ${ options.project } already exists!` );
    return;
  }

  switch ( flags.type ) {
    case 'ts': {
      console.log( 'DM-Tools is generating a new TypeScript Node.js Server, static Web site project...' );
      sh.cp( '-r', path.resolve( __dirname, '../../.templates/typescript/' ), `${ options.project }` );
      break;
    }

    case 'node': {
      console.log( 'DM-Tools is generating a TypeScript Node.js Server project...' );
      sh.cp( '-r', path.resolve( __dirname, '../../.templates/node/' ), `${ options.project }` );
      break;
    }

    case 'koa': {
      console.log( 'DM-Tools is generating a JavaScript Koa Server project...' );
      sh.cp( '-r', path.resolve( __dirname, '../../.templates/koa/' ), `${ options.project }` );
      break;
    }

    case 'gql': {
      console.log( 'DM-Tools is generating a TypeScript Apollo GraphQL Server project...' );
      sh.cp( '-r', path.resolve( __dirname, '../../.templates/apollo-graphql-server/' ), `${ options.project }` );
      break;
    }

    case 'js': {
      console.log( 'DM-Tools is generating a JavaScript Node.js Server project...' );
      sh.cp( '-r', path.resolve( __dirname, '../../.templates/javascript/' ), `${ options.project }` );
      break;
    }

    case 'web': {
      console.log( 'DM-Tools is generating a Static Website project...' );
      sh.cp( '-r', path.resolve( __dirname, '../../.templates/web/' ), `${ options.project }` );
      break;
    }

    default: {
      console.log( 'DM-Tools is generating a JavaScript Node.js Server project...' );
      sh.cp( '-r', path.resolve( __dirname, '../../.templates/javascript/' ), `${ options.project }` );
    }
  } // switch


  sh.pushd( `${ options.project }` );
  sh.mkdir( 'docs', 'logs' );
  sh.exec( 'git init' );
  sh.exec( 'git add -A' );
  sh.exec( `git commit -q -m "${ commit_message }"` );
  sh.exec( 'git checkout -b dev' );

  if ( YARN ) {
    sh.exec( 'yarn' );
  } else {
    sh.exec( 'npm install' );
  }

  if ( flags.e2e ) {
    if ( YARN ) {
      sh.exec( 'yarn add cypress -D' );
    } else {
      sh.exec( 'npm i -D cypress' );
    }
  }

  // Also need to take into consideration different platforms: Win, MacOS, Linux 32/64.

  // Set up end to end testing.
  // if ( !flags.e2e ) {
  //   sh.mkdir( 'bin_tools' );

  //   // Download Chromedriver.
  //   utils.downloadFileHttps( 'https://chromedriver.storage.googleapis.com/2.33/chromedriver_mac64.zip',
  //     './bin_tools/chromedriver_mac64.zip',
  //     function( err: any ) {
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
  //     function( err: any ) {
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
