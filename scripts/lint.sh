#!/usr/bin/env bash
# Runs eslint on all TypeScript code. Pass -f to fix lint errors.
# See eslint.config.ts for more information.

set -e

EXTRA_FLAGS=""
while getopts ":f" flag; do
    case "${flag}" in
        f) EXTRA_FLAGS="--fix" ;;
    esac
done

npx eslint . $EXTRA_FLAGS
