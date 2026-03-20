#!/usr/bin/env bash
# Cleans TypeScript & RSML build artifacts. Pass -f to perform a full clean,
# including dependencies and .rbxl build artifacts.

set -e

LIMITED_CLEAN="1"
while getopts ":f" flag; do
    case "${flag}" in
        f) LIMITED_CLEAN="0" ;;
    esac
done

if [ "$LIMITED_CLEAN" == "0" ]; then
    printf "\e[1;31mPerforming full clean...\e[0m\n"
    rm -rf $ORCHESTRA_DIR/dist
    rm -rf $ORCHESTRA_DIR/node_modules
    rm -f $ORCHESTRA_DIR/.lastenv
else
    printf "\e[1;33mPerforming limited clean...\e[0m\n"
fi

rm -rf $ORCHESTRA_DIR/places/*/out
rm -rf $ORCHESTRA_DIR/places/**/*.style.model.json
rm -rf $ORCHESTRA_DIR/places/*/include
rm -f $ORCHESTRA_DIR/places/*/flamework.build
