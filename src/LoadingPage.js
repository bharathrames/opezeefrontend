import React from 'react';
import VideoFile from './video.mp4'; 

const LoadingPage = ({ handleHomeClick }) => (
  <div className='loading'>
    <video className={VideoFile}autoPlay muted loop>
      <source src={VideoFile} type="video/mp4" />
    </video>
    <div class="loader"></div>
    <p>Your app is opened</p>
    <button onClick={handleHomeClick} class="glow-on-hover">Home</button>
  </div>
);

export default LoadingPage;
