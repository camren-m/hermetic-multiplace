#!/usr/bin/env bash
set -e
set -o allexport

SCRIPT_DIR=$(dirname "$0")
: "${NODE_ENV:=dev}"

if [ "$NODE_ENV" == "prod" ]; then
    source $SCRIPT_DIR/../.env.prod
    printf "\e[1;31mUsing production environment!\e[0m\n"
elif [ "$NODE_ENV" == "staging" ]; then
    source $SCRIPT_DIR/../.env.staging
    printf "\e[1;33mUsing staging environment!\e[0m\n"
else
    source $SCRIPT_DIR/../.env.dev
    printf "\e[1;34mUsing development environment!\e[0m\n"
fi
if [ -f ".lastenv" ]; then
    LAST_ENV=$(<.lastenv)
else
    LAST_ENV=dev
fi

if [ "$LAST_ENV" != "$NODE_ENV" ]; then
    printf "\e[1;34mEnvironment changed, cleaning\e[0m\n"
    $SCRIPT_DIR/clean.sh -l
fi

echo "$NODE_ENV" > .lastenv

set +o allexport
