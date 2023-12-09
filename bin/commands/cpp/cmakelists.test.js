'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateCMakeListsTest = void 0;
function getTemplateCMakeListsTest(test_project_name, headers, source, config) {
    const header_files = headers.map((v) => ` ../${v}`);
    const source_files = source.map((v) => ` ../${v}`);
    const cmakelists_test = `
cmake_minimum_required( VERSION ${config.project.cmake || '2.6'} )
project( test.${test_project_name} )

# Define ASIO project root from environment variable
#set( ASIO_INCLUDE "$ENV{ASIO_ROOT}" )
#include_directories( "\${PROJECT_SOURCE_DIR}" "\${PROJECT_SOURCE_DIR}/src/include" "\${PROJECT_SOURCE_DIR}/include" "\${ASIO_INCLUDE}" )

# ASIO with C++11
#add_definitions( "-DASIO_STANDALONE" )

# Define boost path using environment var
#set( BOOST_INCLUDE "$ENV{BOOST_ROOT}/include/" )
#set( BOOST_LIB "$ENV{BOOST_ROOT}/lib/" )

#include_directories( "\${PROJECT_SOURCE_DIR}" "\${PROJECT_SOURCE_DIR}/src/include" "\${PROJECT_SOURCE_DIR}/include" "\${BOOST_INCLUDE}" )
#link_directories( "\${BOOST_LIB}" )

include_directories( "\${PROJECT_SOURCE_DIR}" "\${PROJECT_SOURCE_DIR}/src/include" "\${PROJECT_SOURCE_DIR}/include" )
set( SOURCE_FILES test.main.cpp ${source_files.join(' ')} )
set( HEADER_FILES ${header_files.join(' ')} )
add_executable( test.${test_project_name} \${SOURCE_FILES} \${HEADER_FILES} )

# C++11 Support, note to add thread support need to link with pthread
add_definitions( "-std=c++11" )

# C++17 Support, note to add thread support need to link with pthread
#add_definitions( "-std=c++17" )

#find_package( Threads )
#set( LIB_FILES pthread )
#set( LIB_FILES pthread boost_system boost_thread boost_regex boost_date_time boost_serialization )
target_link_libraries( test.${test_project_name} \${LIB_FILES} \${CMAKE_THREAD_LIBS_INIT} )
`;
    return cmakelists_test;
}
exports.getTemplateCMakeListsTest = getTemplateCMakeListsTest;
