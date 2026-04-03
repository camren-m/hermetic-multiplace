#!/usr/bin/env bash
# Responsible for ensuring the validity of the development environment before
# builds, run before all other scripts as a prepare script through the
# orchestra.

set -e

## ============= !! REMOVE ME VVV ==============
if [ "$(basename $(git config --get remote.origin.url))" != "launchpad.git" ]; then
    printf "\e[1;32mWelcome! To interactively setup your repo, see \e]8;;http://launchpad.camrenmum.me/docs/setup \e\\\\the setup guide\e]8;;\e\\\\ \e[0m\n"
    printf "\e[1;34m\tP.S You're seeing this because you've recently cloned the launchpad template repository, and not yet completed the setup ('$(basename $(git config --get remote.origin.url))' !== 'launchpad.git').\e[0m\n"
    exit 1
fi
## ============= !! REMOVE ME ^^^ =============

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
                [Nn]*) printf "\e[1;31mAborted\e[0m\n" ; exit 1 ;;
            esac
        done
    else
        printf "\e[1;33m-y provided, yes selected\e[0m\n"
    fi
    return 0
}

if ! command -v npm > /dev/null; then
    printf "\e[1;31mNPM/Node.JS must be installed!\e[0m\n"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    printf "\e[1;35mNPM dependencies must be installed. Install now? \e[0m\n"
    yes_or_no
    npm ci
fi

# rokit is used to install rojo and rbxcloud
if ! command -v rokit > /dev/null; then
    printf "\e[1;35mRokit must be installed. Install now? \e[0m\n"
    yes_or_no
    curl -sSf https://raw.githubusercontent.com/rojo-rbx/rokit/main/scripts/install.sh | bash
fi

if ! command -v rbxcloud > /dev/null; then
    printf "\e[1;35mRokit dependencies must be installed. Install now? \e[0m\n"
    yes_or_no
    rokit install
fi


if ! command -v rojo > /dev/null; then
    printf "\e[1;35mRokit dependencies must be installed. Install now? \e[0m\n"
    yes_or_no
    rokit install
fi
