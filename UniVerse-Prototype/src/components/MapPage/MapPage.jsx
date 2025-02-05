import React from 'react';
import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa'; // Icons
import './MapPage.css';
import map from '../../assets/map.png';
import logo2 from '../../assets/logo2-no-bg.png';
import back from '../../assets/icons/chevron-left.svg'
import { useNavigate } from 'react-router-dom';

const MapPage = () => {

  const navigate = useNavigate();
  
  return (
    <div className='map-container'>
      <img src={logo2} alt='The logo of UniVerse' className='logo2' />

      <div className='back-button' onClick={() => navigate('/')}>
        <img src={back} className='back-chevron'/>
      </div>
      <div className='heading'>
        <h2>Welcome To Campus Maps</h2>
      </div>

      <div className='map-page'>
        <div className="map-page-left">
          <img src={map} alt='' className='campus-map-page' />
        </div>

        <div className="map-page-right">
          <h3>Your Location:</h3>
          <div className="form-control">
            <FaMapMarkerAlt className="icon" />
            <input type="text" value="Pan-Atlantic University Main Gate" readOnly />
          </div>

          <h3>Your Destination:</h3>
          <div className="form-control">
            <FaRoute className="icon" />
            <input type="text" value="Yemisi Shyllon Museum" readOnly />
          </div>

          <button className='button button2'>Load Directions</button>

          <h3>Time to Destination</h3>
          <p className='details'>About <span className='time'>9 mins</span> by foot</p>

          <h3>Directions</h3>
          <p className='details'> - Walk straight down for 5mins.</p>
          <p className='details'> - Turn left, then walk straight down for 2mins.</p>
          <p className='details'> - Turn right, then walk straight down for 2mins.</p>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
