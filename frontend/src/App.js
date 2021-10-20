
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

import Environment from './Environment'

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('/health').then(response => {
      console.log("HEALTH CHECK", response)
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
            {getMessage.status === 200 ?  <p>Health: {getMessage.data.message}</p> :  <p></p>}
          </div>
      </header>
      <div className="container-fluid align-center">
        <div className="row">
          <div className="col">
            <Environment />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;