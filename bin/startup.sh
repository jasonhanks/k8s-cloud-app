#!/bin/bash


PROJECT_ROOT="$(dirname "$(dirname "$(readlink -f "$0")")")"
cd ${PROJECT_ROOT}


# Show the environment we are running with
echo "Running container with current environment variables:"
env
echo

# Don't let the Docker port affect the rest of the environment
unset PORT


# If the .env wasn't created through Docker dump our environment to an .env file
if [[ ! -f ./.env ]]; then
    env > ./.env
fi


# Build the React frontend as static files
# Note: this will happen again in startup.sh in case there are environment changes
echo "Running the NPM Build process..."
cd frontend && time npm run build && cd ..
echo

# Launch the backend process
echo "Running the NPM backend server.."
cd backend/
npm start
