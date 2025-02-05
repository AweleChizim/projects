import React, { useState } from 'react';
import './Assignments.css';
import logo2 from '../../assets/logo2-no-bg.png';
import back from '../../assets/icons/chevron-left.svg'
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    code: "CSC 301",
    name: "Data Structures",
    pending: false
  },
  {
    code: "CSC 322",
    name: "Computer Innovation and New Science",
    pending: true,
    assignment: {
      title: "Draft a value proposition for a business idea using the NABC mode",
      dueDate: "February 7th, 2025",
      timeLeft: "4 days",
      progress: 70
    }
  },
  {
    code: "CSC 308",
    name: "Operating Systems",
    pending: false
  },
  {
    code: "CSC 312",
    name: "Compiler Construction",
    pending: false
  },
  {
    code: "GST 301",
    name: "Nigerian People and Cultures",
    pending: false
  }
];

const Assignments = () => {
  const navigate = useNavigate();
  
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className='assignments-container'>
      <img src={logo2} alt='UniVerse Logo' className='logo2' />

      <div className='back-button' onClick={() => navigate('/')}>
        <img src={back} className='back-chevron'/>
      </div>

      <div className='heading'>
        <h2>Your Assignments</h2>
      </div>

      <div className='assignments-page'>
        <div className="assignments-page-left">
          <div className="course-cards">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`course-card ${course.pending ? 'pending' : ''}`}
                onClick={() => handleCourseClick(course)}
              >
                <h3>{course.code}</h3>
                <p>{course.name}</p>
                {course.pending && <span className="pending-badge">Pending</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="assignments-page-right">
          {selectedCourse && selectedCourse.pending ? (
            <div className="assignment-details">
              <h3>{selectedCourse.assignment.title}</h3>
              <p className="due-date">Due Date: {selectedCourse.assignment.dueDate}</p>
              <p className="time-left">Time Left: {selectedCourse.assignment.timeLeft}</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${selectedCourse.assignment.progress}%` }}></div>
              </div>
              <p className="progress-text">{selectedCourse.assignment.progress}% done</p>
            </div>
          ) : (
            <div className="no-assignment">
              <h3>No Pending Assignments</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;