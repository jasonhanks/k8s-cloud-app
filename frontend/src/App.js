
import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Docker from './Docker'
import DockerCompose from './DockerCompose'
import Environment from './Environment'
import HelmChart from './HelmChart'
import Overview from './Overview'


function App() {
  const [getMessage, setMessage] = useState({})

  useEffect(()=>{
    axios.get('/health').then(response => {
      console.log("HEALTH CHECK", response)
      setMessage(response)
    }).catch(error => {
      setMessage(error)
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
          <div className="container-fluid bg-primary text-white text-center">
            <h2>K8s Cloud App</h2>
            <div className="container text-white">
              <ul className="nav justify-content-end text-white">
                <li className="nav-item"><p>{getMessage.status === 200 ?  <code>Health: {getMessage.data.message}</code> :  <i></i>}</p></li>
              </ul>
            </div>
          </div>
      </header>
      <div className="container-fluid align-center">
        <div className="row">
          <div className="col">

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="env-tab" data-bs-toggle="tab" data-bs-target="#env" type="button" role="tab" aria-controls="env" aria-selected="false">Environment Variables</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="docker-tab" data-bs-toggle="tab" data-bs-target="#docker" type="button" role="tab" aria-controls="docker" aria-selected="false">Docker</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="compose-tab" data-bs-toggle="tab" data-bs-target="#compose" type="button" role="tab" aria-controls="compose" aria-selected="false">Docker Compose</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="helm-tab" data-bs-toggle="tab" data-bs-target="#helm" type="button" role="tab" aria-controls="helm" aria-selected="false">Helm Chart</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab"><Overview /></div>
            <div className="tab-pane fade" id="env" role="tabpanel" aria-labelledby="env-tab"><Environment /></div>
            <div className="tab-pane fade" id="docker" role="tabpanel" aria-labelledby="docker-tab"><Docker /></div>
            <div className="tab-pane fade" id="compose" role="tabpanel" aria-labelledby="compose-tab"><DockerCompose /></div>
            <div className="tab-pane fade" id="helm" role="tabpanel" aria-labelledby="helm-tab"><HelmChart /></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
