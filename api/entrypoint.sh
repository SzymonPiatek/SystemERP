#!/bin/sh

if [ -z "$(ls -A /api/node_modules 2>/dev/null)" ]; then
    echo "node_modules is empty, installing dependencies..."
    if [ -f package-lock.json ]; then
        npm ci
    else
        echo "No lockfile found, using npm install"
        npm install
    fi
    npm install -g nodemon
fi

exec "$@"
