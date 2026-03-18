#!/usr/bin/env bash
set -e

SCRIPT_DIR=$(dirname "$0")

source $SCRIPT_DIR/env.sh
$SCRIPT_DIR/checks.sh $1

if [ ! -d "$SCRIPT_DIR/../places/world/out" ]; then
    printf "\e[1;35mPrecompiling world...\e[0m\n"
    (npm run compile:world:styles && npm run compile:world)
fi

if [ ! -d "$SCRIPT_DIR/../places/lobby/out" ]; then
    printf "\e[1;35mPrecompiling lobby...\e[0m\n"
    (npm run compile:lobby:styles && npm run compile:lobby)
fi

# -r is used here as concurrently has issues with npm run if not using raw IO
# FIXME: ideally we don't use raw IO so that nametags are visible (-n)
printf "\e[1;32mBeginning watch & serve!\e[0m\n"
concurrently -r --kill-others -n "world:compile:styles,world:compile,world:serve,lobby:compile:styles,lobby:compile,lobby:serve" \
    "cd places/world && npx chokidar src/**/*.rsml -c \"rsml build src\"" "npm run compile:world -- -w" "cd places/world && rojo serve" \
    "cd places/lobby && npx chokidar src/**/*.rsml -c \"rsml build src\"" "npm run compile:lobby -- -w" "cd places/lobby && rojo serve"
