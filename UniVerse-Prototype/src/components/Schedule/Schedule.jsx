import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa'; 
import './Schedule.css';
import schedule from '../../assets/schedule-calendar.png';
import logo2 from '../../assets/logo2-no-bg.png';
import back from '../../assets/icons/chevron-left.svg'
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <div className='schedule-container'>
      <img src={logo2} alt='The logo of UniVerse' className='logo2' />
      <div className='back-button' onClick={() => navigate('/')}>
        <img src={back} className='back-chevron'/>
      </div>

      <div className='heading'>
        <h2>Your Schedule</h2>
      </div>

      <div className='schedule-page'>
        <div className="schedule-page-left">
          <img src={schedule} alt='Class Calendar' className='schedule' />
        </div>

        <div className="schedule-page-right">
          <h3>Week Selected</h3>
          <div className="form-control">
            <FaCalendarAlt className="icon" />
            <input type="text" value="Week 12" readOnly />
          </div>

          <h3>Class Schedule</h3>

          <p className='days'>Monday</p>
          <p className='details'>9am-12pm: CSC 301 (Venue: Computer Lab 1, SST)</p>
          <div className="separator"></div>

          <p className='days'>Tuesday</p>
          <p className='details'>10am-12pm: CSC 322 (Venue: Jos Classroom, TYD)</p>
          <p className='details'>2pm-4pm: CSC 308 (Venue: Computer Lab 1, SST)</p>
          <div className="separator"></div>

          <p className='days'>Wednesday</p>
          <p className='details'>No Classes</p>
          <div className="separator"></div>

          <p className='days'>Thursday</p>
          <p className='details'>9am-11am: CSC 312 (Venue: Classroom 4, SST)</p>
          <p className='details'>12:30pm-2:30pm: GST 301 (Venue: Classroom 4, SST)</p>
          <div className="separator"></div>

          <p className='days'>Friday</p>
          <p className='details'>No Classes</p>
        </div>
      </div>
    </div>
  );
}

export default Schedule;