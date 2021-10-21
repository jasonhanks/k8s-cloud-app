
import './Environment.css'
import React from 'react'

function EnvironmentVariable(props) {
  return (
    <tr><td>{ props.name }</td><td>{ props.value }</td></tr>
  )
}


function Environment() {
  return (
    <div className="Environment">
      <br/>
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

    </div>          
  </div>
  )
}

export default Environment
