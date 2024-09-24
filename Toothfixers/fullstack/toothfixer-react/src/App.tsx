import React from "react";
import './App.css'
import AboutUs from "./components/about-us";
import PatientCreate from "./components/patient/patient-create";
import PatientView from "./components/patient/patient-view";
import PatientEdit from "./components/patient/patient-edit";
import PatientDelete from "./components/patient/patient-delete";
import RecordCreate from "./components/record/record-create";
import RecordView from "./components/record/record-view";
import RecordEdit from "./components/record/record-edit";
import RecordDelete from "./components/record/record-delete";

import logo from "./logo.png"
  
const App: React.FC = () => {
  return (
    <>
      <div className="bg-green-400 w-screen flex justify-center items-center">
        <img src={logo} className="logo" alt="Vite logo"/>
        <h1 className="header">Tooth Fixers LTD</h1>
      </div>
      <div className="bg-green-100 w-screen">
        <AboutUs/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <PatientCreate/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <PatientView/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <PatientEdit/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <PatientDelete/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <RecordCreate/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <RecordView/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <RecordEdit/>
      </div>
      <div className="bg-green-100 w-screen flex ">
        <RecordDelete/>
      </div>
    </>
  )
}

export default App
