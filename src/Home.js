import React, { useState,useEffect } from 'react'

const Home = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
      // Fetch the list of applications from the server
      // You need to implement this API call
      fetch('http://localhost:2354/api/applications')
        .then(response => response.json())
        .then(data => setApplications(data))
        .catch(error => console.error('Error fetching applications:', error));
    }, []);
  
    const launchApplication = (path, parameters) => {
      // Implement logic to launch the application on the server
      fetch('http://localhost:2354/api/launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path, parameters }),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error launching application:', error));
    };
  
  return (
      <div className="App">
      <header className="App-header">
        <h1>Opezee App</h1>
        <div className="IconRow">
          {applications.map(app => (
            <div key={app._id} className="IconContainer">
              <img
                src={`path_to_icon_folder/${app.name.toLowerCase()}.png`} // Replace with the actual path to your icons
                alt={app.name}
                onClick={() => launchApplication(app.path, app.parameters)}
              />
              <p>{app.name}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  )
}

export default Home