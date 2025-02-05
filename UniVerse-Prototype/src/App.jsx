import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import Academics from "./components/Academics/Academics";
import Title from "./components/Title/Title";
import Map from "./components/Map/Map";
import Events from "./components/Events/Events";
import Clubs from "./components/Clubs/Clubs";
import MapPage from "./components/MapPage/MapPage";
import EventsPage from "./components/EventsPage/EventsPage";
import Schedule from "./components/Schedule/Schedule";
import Courses from "./components/Courses/Courses";
import Assignments from "./components/Assignments/Assignments";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <NavBar/>
            <Hero/>
            <div className="container">
              <Title title='Academics'/>
              <Academics/>
              <Title title='Campus Map'/>
              <Map/>
              <Title title='School Clubs'/>
              <Clubs/>
              <Title title='Events'/>
              <Events/>      
            </div>
          </div>
      } />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/assignments" element={<Assignments/>} />
      </Routes>
    </Router>
  )
}
export default App;

// import { useState } from "react";
// import SignIn from "./components/AuthPages/SignIn";
// import SignUp from "./components/AuthPages/SignUp";
// import { FaUserGraduate, FaLock } from "react-icons/fa";
