#!/usr/bin/env bash
set -e

SCRIPT_DIR=$(dirname "$0")

LIMITED_CLEAN="0"
while getopts ":l" flag; do
    case "${flag}" in
        l) LIMITED_CLEAN="1" ;;
    esac
done

if [ "$LIMITED_CLEAN" == "0" ]; then
    printf "\e[1;31mPerforming full clean...\e[0m\n"
    rm -rf $SCRIPT_DIR/../dist
    rm -rf $SCRIPT_DIR/../node_modules
    rm -f $SCRIPT_DIR/../.lastenv
else
    printf "\e[1;33mPerforming limited clean...\e[0m\n"
fi

rm -rf $SCRIPT_DIR/../places/*/out
rm -rf $SCRIPT_DIR/../places/**.style.model.json
rm -rf $SCRIPT_DIR/../places/*/include
rm -f $SCRIPT_DIR/../places/*/flamework.build
