import React from 'react'
import './Events.css'
import campus_events from '../../assets/campus-events.jpg';
import events_icon from '../../assets/icons/event-schedule-icon.png'
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const navigate = useNavigate();

  return (
    <div className='events'>
        <div className="events-left" onClick={() => navigate('/events')}>
            <img src={campus_events} alt='' className='campus-events'/>
            <img src={events_icon} alt='' className='events-icon'/>
        </div>
        <div className="events-right">
            <h3>Your Go-To Guide for Campus Events & Important Dates!</h3>
            <p>Stay up to date with all campus events! From club meetings to 
              sports games and social gatherings, our event calendar 
              keeps you informed about everything happening at on campus. 
              Never miss out on important dates and exciting opportunities!</p>
        </div>
    </div>
  )
}

export default Events