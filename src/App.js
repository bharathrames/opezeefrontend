import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AppList from './AppList';
import AddApp from './AddApp';
import LoadingPage from './LoadingPage';
import SettingsIcon from '@mui/icons-material/Settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoFile from './video.mp4'; 

const App = () => {
  const [apps, setApps] = useState([]);
  const [newApp, setNewApp] = useState({ name: '', url: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://opezee.onrender.com/api/apps')
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    setNewApp({ ...newApp, [e.target.name]: e.target.value });
  };

  const handleAddApp = () => {
    fetch('https://opezee.onrender.com/api/apps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newApp),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setApps([...apps, newApp]);
          setNewApp({ name: '', url: '', image: '' });
        }
      })
      .catch(error => console.error(error));
  };

  const handleRemoveApp = (appName, appUrl) => {
    fetch(`https://opezee.onrender.com/api/apps/${encodeURIComponent(appName)}/${encodeURIComponent(appUrl)}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('App not found');
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setApps(apps.filter(app => app.name !== appName || app.url !== appUrl));
        }
      })
      .catch(error => console.error(error.message));
  };

  const handleAppClick = (url) => {
    setLoading(true);
    // Open the app in a new tab
    window.open(url, '_blank');
  };

  const handleHomeClick = () => {
    setLoading(false);
  };


  return (
    <Router>
    <div>
    <video className={VideoFile}autoPlay muted loop>
      <source src={VideoFile} type="video/mp4" />
    </video>
      {loading ? (
        <LoadingPage handleHomeClick={handleHomeClick} />
      ) : (
        <>
          <h1 className='appname'>App Launcher</h1>
          <nav>
            <ul>
              <li>
                <Link to="/add-app"><SettingsIcon style={{ fontSize: 35, marginRight: '8px' }} /></Link>
              </li>
            </ul>
          </nav>
          
          <Switch>
            <Route path="/" exact>
              <AppList apps={apps} handleAppClick={handleAppClick} />
            </Route>
            <Route path="/add-app">
              <AddApp
                newApp={newApp}
                handleInputChange={handleInputChange}
                handleAddApp={handleAddApp}
                handleRemoveApp={handleRemoveApp}
              />
            </Route>
          </Switch>
        </>
      )}
    </div>
  </Router>
  );
};

export default App;
