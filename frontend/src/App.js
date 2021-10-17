
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    console.log("Opening health check")
    axios.get('/health').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      setGetMessage(error)
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
          <div className="container-fluid p-5 bg-primary text-white text-center">
            <h1>K8s Cloud App</h1>
          </div>

          <div className="container-fluid text-center">{getMessage.status === 200 ? 
              <h3>Status: {getMessage.data.message}</h3>
              :
              <h3>LOADING</h3>}</div>

          <div className="container mt-5">
            <div className="row">
              <div className="col-sm-4">
                <h3>Column 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              </div>
              <div className="col-sm-4">
                <h3>Column 2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              </div>
              <div className="col-sm-4">
                <h3>Column 3</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              </div>
            </div>
          </div>

      </header>
    </div>
  );
}

export default App;