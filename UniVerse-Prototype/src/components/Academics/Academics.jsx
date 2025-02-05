import React from 'react'
import './Academics.css'
import courses from '../../assets/courses.png'
import schedule from '../../assets/schedule.jpg'
import assignments from '../../assets/assignment.jpg'
import course_icon from '../../assets/icons/course-icon.png'
import schedule_icon from '../../assets/icons/schedule-icon.png'
import assignment_icon from '../../assets/icons/assignment-icon.png'
import { useNavigate } from 'react-router-dom'

const Academics = () => {
  const navigate = useNavigate();

  return (
    <div className='academics'>
      <div className='academic'>
        <img src={courses} alt=""/>
        <div className="caption" onClick={() => navigate('/courses')}>
          <img src={course_icon} alt=""/>
          <p>My Courses</p>
        </div>
      </div>
      <div className='academic'>
        <img src={schedule} alt="" />
        <div className="caption" onClick={() => navigate('/schedule')}>
          <img src={schedule_icon} alt=""/>
          <p>My Schedule</p>
        </div>
      </div>
      <div className='academic'>
        <img src={assignments} alt=""/>
        <div className="caption" onClick={() => navigate('/assignments')}>
          <img src={assignment_icon} alt=""/>
          <p>My Assignments</p>
        </div>
      </div>
    </div>
  )
}

export default Academics