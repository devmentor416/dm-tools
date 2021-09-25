'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateCMakeLists = void 0;
function getTemplateCMakeLists(project_name, header_files, source_files, config) {
    const cmakelists = `
cmake_minimum_required( VERSION ${config.project.cmake || '2.6'} )
project( ${project_name} )

# Define ASIO project root from environment variable
#set( ASIO_INCLUDE "$ENV{ASIO_ROOT}" )
#include_directories( "\${PROJECT_SOURCE_DIR}" "\${PROJECT_SOURCE_DIR}/src/include" "\${PROJECT_SOURCE_DIR}/include" "\${ASIO_INCLUDE}" )

# ASIO with C++11
#add_definitions( "-DASIO_STANDALONE" )

# Define Boost path using environment var
#set( BOOST_INCLUDE "$ENV{BOOST_ROOT}/include/" )
#set( BOOST_LIB "$ENV{BOOST_ROOT}/lib/" )

#include_directories( "\${PROJECT_SOURCE_DIR}" "\${PROJECT_SOURCE_DIR}/src/include" "\${PROJECT_SOURCE_DIR}/include" "\${BOOST_INCLUDE}" )
#link_directories( "\${BOOST_LIB}" )

include_directories( "\${PROJECT_SOURCE_DIR}" "\${PROJECT_SOURCE_DIR}/src/include" "\${PROJECT_SOURCE_DIR}/include" )
set( SOURCE_FILES main.cpp ${source_files.join(' ')} )
set( HEADER_FILES ${header_files.join(' ')} )
add_executable( ${project_name} \${SOURCE_FILES} \${HEADER_FILES} )

# C++11 Support, note to add thread support need to link with pthread
add_definitions( "-std=c++11" )

# C++17 Support, note to add thread support need to link with pthread
#add_definitions( "-std=c++17" )

find_package( Threads )
set( LIB_FILES pthread )
#set( LIB_FILES pthread boost_system boost_thread boost_regex boost_date_time boost_serialization )
target_link_libraries( ${project_name} \${LIB_FILES} \${CMAKE_THREAD_LIBS_INIT} )

add_subdirectory( test )
`;
    return cmakelists;
}
exports.getTemplateCMakeLists = getTemplateCMakeLists;
