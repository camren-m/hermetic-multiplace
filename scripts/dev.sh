#!/usr/bin/env bash
# Concurrently watches .rsml styles and TypeScript code in a place and rebuilds
# when updated. Also serves the Rojo project for that place.

set -e

PLACE_DIRECTORY="$PWD"
PLACE_NAME=$(basename "$PLACE_DIRECTORY") 

printf "\e[1;32mBeginning watch & serve for $PLACE_NAME!\e[0m\n"
npx chokidar src/**/*.rsml -c \"rsml build src\" &
(cd $ORCHESTRA_DIR && npx roblox-ts -p $PLACE_DIRECTORY -w) &
rojo serve &
wait
