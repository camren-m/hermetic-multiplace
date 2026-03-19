#!/usr/bin/env bash
set -e

SKIP_BUILD="0"
while getopts ":s" flag; do
    case "${flag}" in
        s) SKIP_BUILD="1" ;;
    esac
done

if [ "$SKIP_BUILD" == "0" ]; then
    (cd $ORCHESTRA_DIR && orchestra run build)
else
    printf "\e[1;33m-s provided, skipping build and using already built artifacts\e[0m\n"
fi

rbxcloud experience publish --filename ../../dist/world.rbxl --place-id $PLACE_ID --universe-id $EXPERIENCE_ID --version-type published --api-key $OC_API_KEY
