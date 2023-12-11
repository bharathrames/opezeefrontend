import React from 'react';
import './App.css';

const AppList = ({ apps, handleAppClick }) => (
  <ul>
    {apps.map(app => (
      <li key={app._id}>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleAppClick(app.url)}
        >
          <img
            src={app.image}
            alt={app.name}
          />
          <strong>{app.name}</strong>
        </a>
      </li>
    ))}
  </ul>
);

export default AppList;
