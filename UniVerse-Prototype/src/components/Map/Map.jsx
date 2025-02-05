import React from 'react'
import './Map.css'
import campus_map from '../../assets/campus-map.png';
import map_icon from '../../assets/icons/map-icon.png'
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const navigate = useNavigate();

  return (
    <div className='map'>
        <div className="map-left" onClick={() => navigate('/map')}>
            <img src={campus_map} alt='' className='campus-map'/>
            <img src={map_icon} alt='' className='map-icon'/>
        </div>
        <div className="map-right">
            <h3>Explore Your Campus with Ease</h3>
            <p>Find your way around campus with ease! Use our interactive map to locate buildings, dining areas, parking, and more—all at your fingertips.</p>
        </div>
    </div>
  )
}

export default Map