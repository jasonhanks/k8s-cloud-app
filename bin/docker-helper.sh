#!/bin/bash

# Script parameters
PROJECT_ROOT="$(dirname "$(dirname "$(readlink -f "$0")")")"
COMMAND="info"
LOCAL_REPO="k8s-cloud-app"
REMOTE_REPO="jasonhanks/k8s-cloud-app"
TAG="latest"


function Help() {
  echo "Docker helper script for the k8s-cloud-app project"
  echo
  echo "Syntax: docker-helper [-h|-l|-r|-t] <deploy|info>"
  echo
  echo "commands:"
  echo "build)              Build and tag the local Docker container from the project source"
  echo "info)               Display various information about the Docker environment"
  echo "push)               Push a local tag to a remote Docker repository"
  echo "run)                Run the locally built Docker container for testing purposes"
  echo "shell)              Run a shell inside the local Docker container"
  echo "startup)            Startup the services manually (Ex: devel or within the container)"
  echo
  echo "options:"
  echo "h)     Print this Help"
  echo "l)     Local repository to use"
  echo "r)     Remote repository to use"
  echo "t)     Use a specific tag (default=latest) when running Docker commands"
  echo  
}


function Build() {
  echo "Building local Docker tag ${LOCAL_REPO}:${TAG}.."
  echo

  # Build the local tag from the project Dockerfile
  cd ${PROJECT_ROOT}
  docker build -t ${LOCAL_REPO}:${TAG} .
  if [ $? -ne 0 ]; then
    echo
    echo "ERROR: unable to successfully build Docker image"
    exit $?
  fi
}


function Devel() {
  echo "Launching development environment..."
  cd ${PROJECT_ROOT}/backend
  npm run devel
}


function Info() {
  echo "Docker information:"
  echo "command=${COMMAND}, local repo=${LOCAL_REPO}, remote repo=${REMOTE_REPO}, tag=${TAG}"
  echo

  # Show Docker environment information
  docker info
  echo

  # Show local repostiory tags available
  echo "Local repository tags:"
  docker images | grep ${LOCAL_REPO} | grep -v ${REMOTE_REPO}
  echo

  # Show remote repository tags that have been created locally
  echo "Remote repository tags:"
  docker images | grep ${REMOTE_REPO}
}

function Main() {
  echo "docker-helpler.sh running with command: ${COMMAND}"
  echo

  # Run proper function based on the command passed in
  case ${COMMAND} in
    build) # build the container
      Build
      exit;;
    devel) # development environment
      Devel
      exit;;
    info) # display information
      Info
      exit;;
    push) # push image to remote repository
      Push
      exit;;
    run) # run local container
      Run
      exit;;
    shell) # run local container shell
      Shell
      exit;;
    startup) # startup services manually (Ex: within Docker)
      Startup
      exit;;
  esac
  echo
}


function Push() {
  echo "Pushing local tag ${LOCAL_REPO}:${TAG} to remote Docker repository ${REMOTE_REPO}:${TAG}"
  echo

  # Create the local tag that will be deployed from local repository
  echo docker rmi ${REMOTE_REPO}:${TAG}
  docker rmi ${REMOTE_REPO}:${TAG}

  echo docker tag ${LOCAL_REPO}:${TAG} ${REMOTE_REPO}:${TAG}
  docker tag ${LOCAL_REPO}:${TAG} ${REMOTE_REPO}:${TAG}
  if [ $? -ne 0 ]; then
    echo "ERROR occurred while creating Docker tag"
    exit $?
  fi

  # Push the tag to the remote repository
  docker push ${REMOTE_REPO}:${TAG}
  if [ $? -ne 0 ]; then
    echo "ERROR occurred while pushing Docker tag to the remote repository"
    exit $?
  fi
}


function Run() {
  echo "Running Docker container from local repository ${LOCAL_REPO}:${TAG}"
  docker run -it --rm --name k8s-cloud-app --env REACT_APP_BG_COLOR=orange -p 3000:3000 ${LOCAL_REPO}:${TAG} 
}


function Shell() {
  echo "Running Docker container shell from local repository ${LOCAL_REPO}:${TAG}"
  docker run -it --rm -p 3000:3000 ${LOCAL_REPO}:${TAG} bash
}


function Startup() {
  unset PORT
  # If the .env wasn't created through Docker dump our environment to an .env file
  if [[ ! -f ./.env ]]; then
      env > ./.env
  fi

  echo "Compiling React frontend code.."
  cd ${PROJECT_ROOT}/frontend
  npm run build

  echo "Starting services manually..."
  cd ${PROJECT_ROOT}/backend
  npm start
}


# Get the options
while getopts "hlrt:" option; do
   case $option in
        h) # help
          Help
          exit;;
        l) # local repo
          LOCAL_REPO=$OPTARG;;
        r) # remote repo
          REMOTE_REPO=$OPTARG;;
        t) # tag
          TAG=$OPTARG;;
        \?) # Invalid option
            Help
            echo "ERROR: Invalid option specified: -$OPTARG"
            echo
            exit;;
   esac
done
shift $((OPTIND -1))
COMMAND=$1; shift  # Set the command from the first argument


# Execute the Main code
Main

# End of file

