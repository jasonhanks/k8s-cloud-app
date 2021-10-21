
import './Docker.css'
import React from 'react'

function Docker() {
  return (
    <div className="Docker">
        <br/>
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

    </div>
  )
}

export default Docker
