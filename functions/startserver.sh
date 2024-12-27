#!/bin/bash

# Delele the exsisting lib
rm -rf ./lib

# Run the build command
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
  exit 1
fi

# Start Firebase emulators if the build succeeded
firebase use dev
firebase emulators:start --import ./emulators/data --export-on-exit ./emulators/data