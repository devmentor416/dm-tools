'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateTestMain = void 0;
const title_1 = require("./title");
function getTemplateTestMain(options) {
    const test_main = `${(0, title_1.getTemplateTitle)('test.main.cpp', options.config)}\n
// Add header to your project here.

// Required headers for Micro Test.
#include <stdint.h>
#include <cstdlib>
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <functional>
#include "micro-test.hpp"

// Micro Test Website: https://github.com/rajinder-yadav/micro_test

int main( int argc, char * argv[] )
{
   /**
    * This will kick off the tests.
    * We place each test inside blocks to localize variable declarations.
    */
   MicroTest::TestRunner test( argc, argv );

   /* Example for setting a Fixture.
    * Setup is called before each test.
    * Cleanup is called after each test.
    *
    * To reset(clear) fixtures, simply make the call: test.fixture();
    * Fixture will not be use after this call.
    */

   // Set this to true to enable fixture.
   bool enable_fixture = false;

   if ( enable_fixture )
   {
      test.fixture(
      setup_fixture
      {
         // Add setup code here.
      },
      cleanup_fixture
      {
         // Add cleanup code here.
      } );
   }

   test = "Add your first test";
   {
      test( false );
   }

   return 0;
}\n`;
    return test_main;
}
exports.getTemplateTestMain = getTemplateTestMain;
