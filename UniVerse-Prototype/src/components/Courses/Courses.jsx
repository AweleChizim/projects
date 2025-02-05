import React, { useState } from 'react';
import './Courses.css';
import logo2 from '../../assets/logo2-no-bg.png';
import back from '../../assets/icons/chevron-left.svg'
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    code: "CSC 301",
    name: "Data Structures",
    notes: ["note1.pdf", "note2.pdf", "note3.pdf", "note4.pdf", "note5.pdf", "note6.pdf", "note7.pdf", "note8.pdf", "note9.pdf", "note10.pdf", "note11.pdf", "note12.pdf", "note13.pdf", "note14.pdf"]
  },
  {
    code: "CSC 322",
    name: "Computer Innovation and New Science",
    notes: ["note1.pdf", "note2.pdf", "note3.pdf", "note4.pdf", "note5.pdf", "note6.pdf", "note7.pdf", "note8.pdf", "note9.pdf", "note10.pdf", "note11.pdf", "note12.pdf", "note13.pdf", "note14.pdf"]
  },
  {
    code: "CSC 308",
    name: "Operating Systems",
    notes: ["note1.pdf", "note2.pdf", "note3.pdf", "note4.pdf", "note5.pdf", "note6.pdf", "note7.pdf", "note8.pdf", "note9.pdf", "note10.pdf", "note11.pdf", "note12.pdf", "note13.pdf", "note14.pdf"]
  },
  {
    code: "CSC 312",
    name: "Compiler Construction",
    notes: ["note1.pdf", "note2.pdf", "note3.pdf", "note4.pdf", "note5.pdf", "note6.pdf", "note7.pdf", "note8.pdf", "note9.pdf", "note10.pdf", "note11.pdf", "note12.pdf", "note13.pdf", "note14.pdf"]
  },
  {
    code: "GST 301",
    name: "Nigerian People and Cultures",
    notes: ["note1.pdf", "note2.pdf", "note3.pdf", "note4.pdf", "note5.pdf", "note6.pdf", "note7.pdf", "note8.pdf", "note9.pdf", "note10.pdf", "note11.pdf", "note12.pdf", "note13.pdf", "note14.pdf"]
  }
];

const Courses = () => {
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedWeek(1);
  };

  const handleWeekChange = (week) => {
    setSelectedWeek(week);
  };

  return (
    <div className="courses-container">
        <img src={logo2} alt='The logo of UniVerse' className='logo2' />
        
        <div className='back-button' onClick={() => navigate('/')}>
          <img src={back} className='back-chevron'/>
        </div>
        
        <div className='heading'>
        <h2>Your Courses</h2>
        </div>
        
      <div className="course-cards">
        {courses.map((course, index) => (
          <div
            key={index}
            className="course-card"
            onClick={() => handleCourseClick(course)}
          >
            <h3>{course.code}</h3>
            <p>{course.name}</p>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="course-details">
          <h2>{selectedCourse.code}: {selectedCourse.name}</h2>
          <div className="week-selector">
            {[...Array(14).keys()].map((i) => (
              <button
                key={i}
                onClick={() => handleWeekChange(i + 1)}
                className={selectedWeek === i + 1 ? "active" : ""}
              >
                Week {i + 1}
              </button>
            ))}
          </div>
          <div className="note-display">
            <h3>Notes for Week {selectedWeek}</h3>
            <p>Week {selectedWeek} Slides </p>
            <p>{selectedCourse.notes[selectedWeek - 1]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
