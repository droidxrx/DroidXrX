cmake_minimum_required(VERSION 3.4)
set(CMAKE_CXX_STANDARD 17)

project("JSMeow")

file(GLOB SOURCE_FILES "./src/lib/*.cpp" "./src/lib/*.h" "./src/lib/memory/*.cc" "./src/lib/memory/*.h")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

include_directories(${CMAKE_JS_INC} ${CMAKE_SOURCE_DIR}/external/include)
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} ${CMAKE_SOURCE_DIR}/external/lib/OpenGLStatic.lib)

execute_process(COMMAND node -p "require('node-addon-api').include" WORKING_DIRECTORY ${CMAKE_SOURCE_DIR} OUTPUT_VARIABLE NODE_ADDON_API_DIR)
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
add_definitions(-DNAPI_VERSION=3 -DNAPI_DISABLE_CPP_EXCEPTIONS -DGLFW_EXPOSE_NATIVE_WIN32 -DGLEW_STATIC)