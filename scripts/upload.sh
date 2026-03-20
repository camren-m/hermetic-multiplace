#!/usr/bin/env bash
set -e

SKIP_BUILD="0"
while getopts ":s" flag; do
    case "${flag}" in
        s) SKIP_BUILD="1" ;;
    esac
done

if [ "$SKIP_BUILD" == "0" ]; then
    orchestra run build
else
    printf "\e[1;33m-s provided, skipping build and using already built artifacts\e[0m\n"
fi

if gh release view "v$RELEASE_NUMBER" >/dev/null 2>&1; then
    printf "\e[1;33mRelease v$RELEASE_NUMBER already exists, not pushing release\e[0m\n"
else
    if [ "$NODE_ENV" == "prod" ]; then
        gh release create "v$RELEASE_NUMBER" \
            --draft \
            --latest \
            --generate-notes \
            --title "($RELEASE_NUMBER) $RELEASE_NAME"
    elif [ "$NODE_ENV" == "staging" ]; then
        gh release create "v$RELEASE_NUMBER" \
            --draft \
            --prerelease \
            --generate-notes \
            --title "($RELEASE_NUMBER) $RELEASE_NAME"
    else
        printf "\e[1;33mNot in a staging or prod environment, not pushing release\e[0m\n"
        exit
    fi
    gh release upload v$RELEASE_NUMBER dist/*.rbxl
    gh release edit v$RELEASE_NUMBER --draft=false
fi
