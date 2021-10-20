
import './Environment.css'
import React from 'react'

function EnvironmentVariable(props) {
  return (
    <tr><td>{ props.name }</td><td>{ props.value }</td></tr>
  )
}


function Environment() {
  console.log(process.env)
  return (
    <div className="Environment">
      <h1>Environment</h1>
      <p>This section shows the environment variables that have been populated for this process.</p>

      <div className="container-fluid">
        <table style={{ backgroundColor: process.env.REACT_APP_BG_COLOR }}>
          <thead>
            <tr>
              <th scope="col">Variable</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(process.env).map( (name) => 
              <EnvironmentVariable key={name} name={name} value={process.env[name]} />
            )}
          </tbody>
        </table>
        <br/>


        <p><i><b>Note:</b> environment variables must begin with REACT_APP_ in order to show up in the React user interface. Otherwise
          they will be filtered out and not available to the React application even if they are available to the container.</i></p>


        <h2>Docker</h2>
        <p>When using Docker you can specify these environment variables using a few different methods.</p>

        <h3>--env option</h3>
        <p>You can specify each environment variable you want to be available in the container using the 
          <i>--env=&lt;var&gt;="&lt;value&gt;"</i> syntax. An exmaple is shown below:</p>
        <pre>
          <code data-language="shell" children={
`docker run --rm --name k8s-cloud-app -it -p 3000:3000 --env=REACT_APP_BG_COLOR="lightgreen" jasonhanks/k8s-cloud-app:latest env | grep REACT_APP_
REACT_APP_BG_COLOR=lightgreen
`
          }></code>
        </pre>

        <h3>--env-file option</h3>
        <p>You can specify a filename that contains any number of environment variables to specify in the container. 
        This is done using the <i>--env-file=&lt;filename&gt;</i> syntax. You can create the .env file using the following command:</p>


        <pre>
          <code data-language="shell" children={
`cat << EOF > ./.env
REACT_APP_BG_COLOR=lightgreen
EOF
`
          }></code>
        </pre>
        

        <p>You can launch the container using a file containing the environment variables using the following command:</p>
        <pre>
          <code data-language="shell" children={
`# Create the environment file to be passed in
docker run --rm --name k8s-cloud-app -it -p 3000:3000 --env-file=./.env.example jasonhanks/k8s-cloud-app:latest env | grep REACT_APP_
REACT_APP_BG_COLOR=lightgreen
`
          }></code>
        </pre>


        <h2>Helm Chart</h2>
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
    </div>
  );
}

export default Environment;
