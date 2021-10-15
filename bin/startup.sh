#!/bin/bash


export ENVIRONMENT=production
export SKIP_BUILD_REACT=false
export VERBOSE=false


Help() {
   # Display Help
   echo "Startup script for the k8s-cloud-app process"
   echo
   echo "Syntax: startup.sh [-g|h|v]"
   echo "options:"
   echo "h)     Print this Help"
   echo "e)     Load specific Flask environment"
   echo "r)     Skip react build script execution"
   echo "v)     Verbose mode"
   echo
}


Main() {
    # Figure out our absolute pathname for the parent folder and change dir there
    export PROJECT_ROOT="$(dirname "$(dirname "$(readlink -fm "$0")")")"
    cd ${PROJECT_ROOT}


    # Load the proper environment
    if [ "$VERBOSE" == "true" ]; then echo "Loading python virtual environment.."; fi
    source env/bin/activate


    # Display our entire environment for debugging purposes
    #echo "Running with following environment variables:"
    #printenv


    if [ "$SKIP_BUILD_REACT" != "true" ]; then
        # Run the npm build from the React scripts
        if [ "$VERBOSE" == "true" ]; then echo "Building HTML files from React files.."; fi
        cd frontend && time npm run build && cd ${PROJECT_ROOT}
        echo
    fi


    # Execute the Flask web server process here (app.py)
    if [ "$VERBOSE" == "true" ]; then echo "Running the Flask web application server in $FLASK_ENV environment with DEBUG=${DEBUG}.."; fi
    #FLASK_ENV=${ENVIRONMENT} flask run --host=0.0.0.0
    cd $PROJECT_ROOT
    python3 app.py
}


# Get the options
while getopts "e:hrv" option; do
   case $option in
        e) # load environment
            echo "Loading environment: ${OPTARG}"
            ENVIRONMENT=$OPTARG;;
        h) # help
            Help
            exit;;
        r) # skip react script building
            SKIP_BUILD_REACT=true;;
        v) # verbose mode
            VERBOSE=true;;
        \?) # Invalid option
            Help
            echo "ERROR: Invalid option specified: -$OPTARG"
            echo
            exit;;
   esac
done


# Execute the Main code
Main

# End of file
