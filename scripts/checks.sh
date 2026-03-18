#!/usr/bin/env bash
set -e

ALWAYS_YES="0"
while getopts ":y" flag; do
    case "${flag}" in
        y) ALWAYS_YES="1" ;;
    esac
done

function yes_or_no {
    if [ "$ALWAYS_YES" == "0" ]; then
        while true; do
            read -p "$* [y/n]: " yn
            case $yn in
                [Yy]*) return 0 ;;  
                [Nn]*) echo "Aborted" ; exit 1 ;;
            esac
        done
    else
        echo "-y provided, yes selected"
    fi
    return 0
}

if ! command -v npm > /dev/null; then
    echo "NPM/Node.JS must be installed!"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "NPM dependencies must be installed. Install now? : "
    yes_or_no
    npm ci
fi

# rokit is used to install rojo and rbxcloud
if ! command -v rokit > /dev/null; then
    echo "Rokit must be installed!"
    exit 1
fi

if ! command -v rbxcloud > /dev/null; then
    echo "Rokit dependencies must be installed. Install now? : "
    yes_or_no
    rokit install
fi


if ! command -v rojo > /dev/null; then
    echo "Rokit dependencies must be installed. Install now? : "
    yes_or_no
    rokit install
fi

if ! command -v concurrently > /dev/null; then
    echo "Concurrently must be installed. Install now? : "
    yes_or_no
    npm i -g concurrently@latest
fi
