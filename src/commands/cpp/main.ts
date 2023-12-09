'use strict';
import { getTemplateTitle } from './title';
import { Options } from './types';

export function getTemplateMain( header_files: string[], options: Options ): string {
  let headers = '';
  header_files.forEach( ( v ) => {
    headers = `${ headers }#include "${ v }"\n`;
  } );

  const main = `${ getTemplateTitle( 'main.cpp', options.config ) }\n
#include <iostream>

// Header files you may require.
//#include <array>
//#include <deque>
//#include <list>
//#include <map>
//#include <queue>
//#include <string>
//#include <vector>
//
//#include <fstream>
//#include <sstream>
//
//#include <utility>
//#include <memory>
//#include <algorithm>
//
//#include <regex>
//#include <thread>

${ headers }
//using namespace std;

using std::clog;
using std::cerr;
using std::cout;
using std::endl;

int main( int argc, char* argv[] )
{
   clog << "Hello World!" << endl;
   return 0;
}\n`;
  return main;
}
