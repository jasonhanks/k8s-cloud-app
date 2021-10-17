# k8s-cloud-app

This is a sample Node based web based application intended to be used for Kubernetes practice and testing in preparation for the CKA / CKAD examinations.

**Note:** *These features will be under ongoing development for the forseeable future.*


### React Frontend

This project provides a React frontend web application that will expose various features
of Docker and Kubernetes to control various parts of the application from a web browser. 


### Node Backend

It also provides a backend Node process that the frontend will communicate with. 
The React frontend will automatically proxy its requests to the backend Node process.


### Docker Container

Docker support files that are needed to build and run the container standalone are provided. These include the *Dockerfile* used to build the container itself as well as any supporting files. 


### Docker Compose

A *docker-compose.yaml* file that can be used to launch or build the container as needed is also provided for convenience.


### Helm Chart

A Helm Chart is provided that can deploy the app to a Kubernetes cluster. Most of the development around this project will be focused around this use case.



# Running the *official* container

Use the following command to launch the Docker Hub container that is generated from this project:

    docker run --rm -p 3000:3000 jasonhanks/k8s-cloud-app

Alternative, using Docker Compose you can run the following command:

    docker-compose up

This will launch the container with the internal container port 80 exposed externally on port 3000. 

You can then access the container using the URL: http://localhost:3000/



# Building the Container manually

You can also build the container locally from the project source using the following command from the project root folder:

    docker build -t k8s-cloud-app .

This will build a local image with the image name **k8s-cloud-app** that can be launched using the following command:

    docker run -rm -p 3000:3000 k8s-cloud-app

This will launch your local version of the container with the container's web port exposed locally on port 3000. 

You can then access the container using the following URL: http://localhost:3000/



# Running the Helm Chart in Kubernetes

You can also deploy this application to a Kubernetes cluster. The Helm Chart files are located in the *helm/* folder and instructions for customizing a deployment are provided below.


## Default Helm Chart

By default the provided Helm chart will deploy a single instances to your Kubernetes cluster that will need to be accessed using port forwarding functionality of *kubectl*. 

In order to deploy the default configuration use the following command from a shell configured with access to a Kubernetes cluster and Helm installation:

    helm install k8s-cloud-app helm/

This will deploy the application with a name of *k8s-cloud-app*. In Kubernetes this will generate a Service, Deployment, and associated Pod with the app deployed in the *default* namespace. 

You can customize the namespace used in Kubernetes using the *--namespace=<namespace>* parameter to the *helm install* command.

If your Kubernetes cluster is working when you install the Helm Chart you should see the following output:

    NAME: k8s-cloud-app
    LAST DEPLOYED: Fri Oct 15 23:48:35 2021
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    NOTES:
    1. Get the application URL by running these commands:
      export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=k8s-cloud-app,app.kubernetes.io/instance=k8s-cloud-app" -o jsonpath="{.items[0].metadata.name}")
      export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
      echo "Visit http://127.0.0.1:8080 to use your application"
      kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT

### Accessing the default Helm deployment

In order to access the Kubernetes deploement you should use the commands provided from the Helm installation output (sample output provided above). When you run the final *kubectl port-forward* command you should see output similar to below:

    user@machine:~/projects/k8s-cloud-app$ kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
    Forwarding from 127.0.0.1:8080 -> 80
    Forwarding from [::1]:8080 -> 80

Once you see this output you should be able to acces it using the following URL: http://localhost:8080/


## Customizing the Helm Chart deployment

If you wish to deploy the app to a Kubernetes cluster using Helm you can generate the default *values.yaml* used to customize your deployment using the following command:

    helm show values helm/ > ~k8s-cloud-app-values.yaml

You can then edit this file to customize the deployment as needed. An example *values.yaml* below shows how to deploy multiple *replicas*, *Resource* limits per Pod, and an *Ingress* allowing access to the Service (DNS entries will need to be setup to forward this host name into your Kubernetes cluster nodes):

    # Start 2 Pods by default
    replicaCount: 2

    # Example Ingress allowing traffic to route into the Service
    ingress:
      enabled: true
      hosts:
        # Override the host below to a DNS entry pointing to one of your Kubernetes nodes
        - host: k8s-cloud-app.example.com
          paths:
            - path: /
              pathType: Prefix

    # Pod resources limits
    resources:
      limits:
        cpu: 1
        memory: 1Gi
      requests:
        cpu: 0.5
        memory: 512Mi


You can then use the specified value overrides when deploying the Helm chart:

    user@machine:~/projects/k8s-cloud-app$ helm install k8s-cloud-app helm/ -f ~/k8s-cloud-app-values.yaml
    NAME: k8s-cloud-app
    LAST DEPLOYED: Sat Oct 16 00:42:08 2021
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    NOTES:
    1. Get the application URL by running these commands:
      http://k8s-cloud-app.example.com/


## Accessing a custom Ingress Service

In the previous example value overrides above an *Ingress* was created which will map the *k8s-cloud-app.example.com* domain name to the defined
Kubernetes *Service* that has been created by the Helm chart. In order for this to work there must be a DNS entry (or /etc/hosts entry) that
maps the specified domain name to the IP address of one of your Kubernetes nodes (Ex: controller). 

This will send all web traffic sent to this address to the Kubernetes cluster where the *Ingress* will be processed and traffic
sent to the appropriate backend *Service*.

You should then be able to access the application using the URL: http://k8s-cloud-app.example.com (or whatever your proper domain name is)


## Installing the Helm Chart

When you are satisfied with the configuration use the following command to deploy the application to your Kubernetes cluster from the project root folder:

    helm install k8s-cloud-app helm/ -f ./k8s-cloud-app-values.yaml

