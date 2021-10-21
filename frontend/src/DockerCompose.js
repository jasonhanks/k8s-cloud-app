
import './Docker.css'
import React from 'react'

function DockerCompose() {
  return (
    <div className="Docker">
        <br/>
        <p>This sections shows an example docker-compose.yaml file that can be used to bring up this entire stack
          and customize this application.</p>

        <pre>
            <code data-language="shell" children={
`version: '3.7'
services:
  k8s-cloud-app:
    build:
      context: .
    image: k8s-cloud-app:latest
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      REACT_APP_BG_COLOR: "lightyellow"
`                
            }></code>
        </pre>

        <p>You can then use the following Docker Compose command to bring up the stack:</p>
        <pre>
            <code data-language="shell" children={
                `docker-compose up`                
            }></code>
        </pre>

        <p>You can then navigate to <a href="http://localhost:3000">http://localhost:3000</a> to 
        view the application.</p>

    </div>
  )
}

export default DockerCompose
