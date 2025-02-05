import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import './EventsPage.css';
import event from '../../assets/event-calendar.png';
import logo2 from '../../assets/logo2-no-bg.png';
import back from '../../assets/icons/chevron-left.svg'
import { useNavigate } from 'react-router-dom';


const EventsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className='events-container'>
      <img src={logo2} alt='The logo of UniVerse' className='logo2' />

      <div className='back-button' onClick={() => navigate('/')}>
        <img src={back} className='back-chevron'/>
      </div>

      <div className='heading'>
        <h2>Welcome To Events Calendar</h2>
      </div>

      <div className='events-page'>
        <div className="events-page-left">
          <img src={event} alt='Event Calendar' className='events-schedule' />
        </div>

        <div className="events-page-right">
          <h3>Date Selected</h3>
          <div className="form-control">
            <FaCalendarAlt className="icon" />
            <input type="text" value="30/01/2025" readOnly />
          </div>

          <h3>Events Scheduled</h3>
          <p className='details'>No events scheduled</p>

        </div>
      </div>
    </div>
  );
}

export default EventsPage;
