"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_1 = require("./title");
function getTestMain() {
    const test_main = `${title_1.getTitle("test.main.cpp")}\n
// Add header to your project here.

// Required headers for Micro Test.
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
exports.getTestMain = getTestMain;
//# sourceMappingURL=test.main.js.map