#!/usr/bin/env bash
set -e

SCRIPT_DIR=$(dirname "$0")

$SCRIPT_DIR/checks.sh $1

EXTRA_FLAGS=""
while getopts ":f" flag; do
    case "${flag}" in
        f) EXTRA_FLAGS="--fix" ;;
    esac
done

eslint . $EXTRA_FLAGS
