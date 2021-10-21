
import './HelmChart.css'
import React from 'react'

function Helm() {
  return (
    <div className="Helm">
        <br/>
        <p>When using Helm you can specify these environment variables using the custom <i>values.yaml</i> file.</p>

        <h3>Create a custom values.yaml</h3>
          <p>You can create these environment variables using the folloing sample values.yaml file:</p>
          <pre>
          <code data-language="shell" children={
`cat << EOF >> ~/k8s-app-cloud-values.yaml
environment:
- name: REACT_APP_BG_COLOR
  value: lightyellow
EOF
`
          }></code>
        </pre>

        <p>You can then deploy the Helm Chart using the following command line:</p>
        <pre>
          <code data-language="shell" children={
`helm install k8s-cloud-app -f ~/k8s-cloud-app-values.yaml helm/
NAME: k8s-cloud-app
LAST DEPLOYED: Wed Oct 20 13:17:10 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=k8s-cloud-app,app.kubernetes.io/instance=k8s-cloud-app" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
`
        }></code>
      </pre>
    </div>
  )
}

export default Helm
