# k8s-cloud-app

This is a sample Python web based application intended to be used for Kubernetes practice and testing in preparation for the CKA / CKAD examinations.

This project provides a Python Flask based web application that can use various features of Docker and Kubernetes to control various parts of the application from a web browser. 

**Note:** *These features will be under ongoing development for the forseeable future.*

Docker support files that are needed to build and run the container standalone are provided. These include the *Dockerfile* used to build the container itself as well as any supporting files. 

A *docker-compose.yaml* file that can be used to launch or build the container as needed is also provided for convenience.

Lastly, a Helm Chart is provided that can deploy the app to a Kubernetes cluster. Most of the development around this project will be focused around this use case.


# Running the *official* Docker Hub container

Use the following command to launch the Docker Hub container that is generated from this project using the following command:

```
    docker run --rm -p 3000:80 jasonhanks/k8s-cloud-app
```

This will launch the container with the internal web port 80 exposed externally on port 3000. 

You can then access the container using the URL: http://localhost:3000/


# Running the Helm Chart in Kubernetes

You can deploy this application to a Kubernetes cluster. The Helm Chart files are located in the *helm/* folder and instructions for customizing a deployment are provided below.


## Default Helm Chart

By default the provided Helm chart will deploy a single instances to your Kubernetes cluster that will need to be accessed using port forwarding functionality of *kubectl*. 

In order to deploy the default configuration use the following command from a shell configured with access to a Kubernetes cluster and Helm:

```
    helm install k8s-cloud-app helm/
```

This will deploy the application with a name of *k8s-cloud-app*. In Kubernetes this will generate a Service, Deployment, and associated Pod with the app deployed in the *default* namespace. You can customize the namespace by providing the proper parameters to the *helm install* command.

If your Kubernetes cluster is working when you install the Helm Chart you should see the following output:

```
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
```

### Accessing the default Helm deployment

In order to access the Kubernetes deploement you should use the commands provided from the Helm installation output (sample output provided above). When you run the final *kubectl port-forward* command you should see output similar to below:

```
user@machine:~/projects/k8s-cloud-app$ kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

Once you see this output you should be able to acces it using the following URL: http://localhost:8080/


## Customizing the Helm Chart deployment

If you wish to deploy the app to a Kubernetes cluster using Helm you can generate the *values.yaml* used to customize your deployment using the following command from the project root folder:

```
 helm show values helm/ > k8s-cloud-app-values.yaml
```

You can then edit this file as needed to customize the deployment as needed. 


## Installing the Helm Chart

When you are satisfied with the configuration use the following command to deploy the application to your Kubernetes cluster from the project root folder:

```
helm install k8s-cloud-app helm/ -f ./k8s-cloud-app-values.yaml
```


# Building the Container manually

You can also build the container locally from the project source using the following command from the project root folder:

```
docker build -t k8s-cloud-app .
```

This will build a local image with the image name **k8s-cloud-app** that can be launched using the following command:

```
docker run -rm -p 3000:80 k8s-cloud-app
```

This will launch your local version of the container with the container's web port exposed locally on port 3000. 

You can then access the container using the following URL: http://localhost:3000/
