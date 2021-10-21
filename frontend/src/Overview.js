
import './Overview.css'
import React from 'react'

function Overview() {
  return (
    <div className="Overview">
        <br/>
        <p>
            This application is used to display various customized aspects that are controlled
            by Docker or by Kubernetes when deploying this application with a container.
        </p>
        <p>
            Primarily this will involve populating configuration through Environment Variables as
            well as mounting various volumes into the container.
        </p>
        <p>
            Additionally this project will evolve into a minimal full stack application consisting of 
            the following components:
        </p>
        <ul>
            <li><a rel="noreferrer" target="_blank" href="https://expressjs.com/">Express API Server</a> - API server used by the React application to communicate and 
                execute various functionality
            </li>
            <li><a rel="noreferrer" target="_blank" href="https://hub.docker.com/_/mongo">Mongo Server</a> - used for persistent storage for the application API server</li>
            <li><a rel="noreferrer" target="_blank" href="https://hub.docker.com/_/mongo-express">Mongo Express</a> - web app used to view data stored in Mongo</li>
        </ul>
    </div>
  )
}

export default Overview
