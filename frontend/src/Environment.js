
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

      <div className="container">
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

        <h3>Docker</h3> 
        <p>
          When using Docker you can specify these environment variables using a few different methods.                     
        </p>
        <p>
          <i><b>Note:</b> environment variables must begin with REACT_APP_ in order to show up in the React user interface. Otherwise
          they will be filtered out and not available to the React application even if they are available to the container.</i>
        </p>

        <h4>--env option</h4>
        <p>
          You can specify each environment variable you want to be available in the container using the 
          <i>--env=&lt;var&gt;="&lt;value&gt;"</i> syntax. An exmaple is shown below:
        </p>
        <pre>
          <code data-language="python" children={
`dev@dev:~/k8s-cloud-app$ docker run --rm --name k8s-cloud-app -it -p 3000:3000 --env=REACT_APP_BG_COLOR="lightgreen" jasonhanks/k8s-cloud-app:latest env | grep REACT_APP_
REACT_APP_BG_COLOR=lightgreen
dev@dev:~/k8s-cloud-app$
`
          }></code>
        </pre>

        <h4>--env-file option</h4>
        You can specify a filename that contains any number of environment variables to specify in the container. 
        This is done using the <i>--env-file=&lt;filename&gt;</i> syntax.

        You can launch the container using a file containing the environment variables using the following command:
        <pre>
          <code data-language="python" children={
`# Create the environment file to be passed in
dev@dev:~/k8s-cloud-app$ docker run --rm --name k8s-cloud-app -it -p 3000:3000 --env-file=./.env.example jasonhanks/k8s-cloud-app:latest env | grep REACT_APP_
REACT_APP_BG_COLOR=lightcyan
dev@dev:~/k8s-cloud-app$
`
          }></code>
        </pre>

      </div>
    </div>
  );
}

export default Environment;
