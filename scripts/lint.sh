#!/usr/bin/env bash
set -e

EXTRA_FLAGS=""
while getopts ":f" flag; do
    case "${flag}" in
        f) EXTRA_FLAGS="--fix" ;;
    esac
done

npx eslint . $EXTRA_FLAGS
