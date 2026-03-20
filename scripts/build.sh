#!/usr/bin/env bash
# Build TypeScript code, RSML styles, and .rbxl artifacts in a place. Outputs
# the final .rbxl build artifact to dist/.

set -e

PLACE_DIRECTORY="$PWD"
PLACE_NAME=$(basename "$PLACE_DIRECTORY") 

printf "\e[1;35mBuilding $PLACE_NAME.rbxl for release $RELEASE_NUMBER ($RELEASE_NAME)...\e[0m\n"
mkdir -p $ORCHESTRA_DIR/dist

printf "\e[1;35mCompiling styles...\e[0m\n"
(rsml build src/ && rsml build $ORCHESTRA_DIR/places/common)

printf "\e[1;35mCompiling TypeScript...\e[0m\n"
(cd $ORCHESTRA_DIR && npx roblox-ts -p $PLACE_DIRECTORY)

printf "\e[1;35mBuilding $PLACE_NAME.rbxl...\e[0m\n"
rojo build -o $ORCHESTRA_DIR/dist/$PLACE_NAME.rbxl

printf "\e[1;32mBuilt $PLACE_NAME.rbxl for release $RELEASE_NUMBER ($RELEASE_NAME)!\e[0m\n"
