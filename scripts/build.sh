#!/usr/bin/env bash
set -e

SCRIPT_DIR=$(dirname "$0")

source $SCRIPT_DIR/env.sh
$SCRIPT_DIR/checks.sh $1

printf "\e[1;35mBuilding release $RELEASE_NUMBER ($RELEASE_NAME)...\e[0m\n"
mkdir -p dist/

printf "\e[1;35mCompiling world code & styles...\e[0m\n"
(npm run compile:world:styles && npm run compile:world)
printf "\e[1;35mCompiling lobby code & styles...\e[0m\n"
(npm run compile:lobby:styles && npm run compile:lobby)

printf "\e[1;35mBuilding world rbxl...\e[0m\n"
rojo build -o dist/world.rbxl places/world/default.project.json
printf "\e[1;35mBuilding lobby rbxl...\e[0m\n"
rojo build -o dist/lobby.rbxl places/lobby/default.project.json
printf "\e[1;32mBuilt release $RELEASE_NUMBER ($RELEASE_NAME)!\e[0m\n"
