#!/usr/bin/env bash
: ' 
What:
  In order:
    - Build client
    - Move build to project build dir
    - Rename build

Why:
  Needed a way to have Next client build output to project build folder

Instructions:
  Run this script from the project root
'

CLIENT_SOURCE_DIR="./src/app/client"
APP_BUILD_DIR="./build/app"

# Build client
next build ${CLIENT_SOURCE_DIR}

# Move build to project build dir
mv -f "${CLIENT_SOURCE_DIR}/.next" ${APP_BUILD_DIR}

# Rename build
mv -f "${APP_BUILD_DIR}/.next" "${APP_BUILD_DIR}/client"