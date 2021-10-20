# Environment

This section will show how this image can be used to test various aspects
of of the environment provided by Docker and Kubernetes.


## Application Environment

The k8s-cloud-app will read a few specific *environment variables* that will
control some various aspects of the application when these values are changed.

Below is a list of environment variables supported:

* BACKGROUND_COLOR - the background color used for the background (default is white)


### Docker Environment

From Docker there are a few different ways to specify this environment variable. 
When using Docker *run* you can specify the *--env* option or *--env-file* option
to specify multiple values at once.

    # Specify manually
    docker run --rm jasonhanks/k8s-cloud-app --env=BACKGROUND_COLOR=lightgrey

    # Read from file
    docker run --rm jasonhanks/k8s-cloud-app --env-file=./.env




### Docker Secrets

