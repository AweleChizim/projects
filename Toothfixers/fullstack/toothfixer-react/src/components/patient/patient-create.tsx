import React from 'react';

const PatientCreate: React.FC = () => {
  return (
    <>
        <div className="grid-item-row-2">
          <h1 className="font-bold text-green-800 bg-green-300 w-full'">Register a new patient</h1>
          <form className="box" id="createPatientForm" action="/api/patients" method="POST">
              <fieldset id="createPatientFormFieldSet" className="container">
                  <div className="field flex">
                      <label className="label text-green-700">National Identification Number:</label>
                      <div className="control has-icons-right">
                          <input className="input" id="NIN" name="NIN" type="number" placeholder="NIN" required></input>
                      </div>
                  </div>
                  <br></br>
                  <div className="field flex">
                      <label className="label text-green-700">First name: </label>
                      <div className="control has-icons-right">
                          <input className="input" id="firstName" name="firstName" type="text" placeholder="First name" required></input>
                      </div>
                  </div>
                  <br></br>
                  <div className="field flex">
                      <label className="label text-green-700">Middle name:</label>
                      <div className="control has-icons-right">
                          <input className="input" id="middleName" name="middleName" type="text" placeholder="Middle name"></input>
                      </div>
                  </div>
                  <br></br>
                  <div className="field flex">
                      <label className="label text-green-700">Last name:</label>
                      <div className="control has-icons-right">
                          <input className="input" id="lastName" name="lastName" type="text" placeholder="Last name"></input>
                      </div>
                  </div>
                  <br></br>
                  <div className="field flex">
                      <label className="label text-green-700">Date of birth:</label>
                      <div className="control has-icons-right">
                          <input className="input" id="dateOfBirth" name="dateOfBirth" type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="yyyy-mm-dd"></input>
                      </div>
                  </div>
                  <br></br>
                  <div className="field flex">
                      <label className="label text-green-700">Home Address:</label>
                      <div className="control has-icons-right">
                          <input className="input" id="homeAddress" name="homeAddress" type="text" placeholder="Home Address"></input>
                      </div>
                  </div>
                  <br></br>
                  <div className="field flex">
                      <label className="label text-green-700">Date of registration:</label>
                      <div className="control has-icons-right">
                          <input className="input" id="dateOfRegistration" name="dateOfRegistration" type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="yyyy-mm-dd"></input>
                      </div>
                  </div>
                  <br></br>
                  <div className="field is-grouped">
                      <div className="control">
                          <button type="submit" id="submitCreatePatientForm" className="button font-bold text-green-800  bg-green-400 is-link is-small">Submit</button>
                      </div>
                      <br></br>
                      <div className="control">
                          <button type="reset" className="button  bg-green-400 is-light is-small text-green-800 font-bold">Clear</button>
                      </div>
                  </div>
                  <br></br>
                  <br></br>
              </fieldset>
          </form>

      </div>
    </>
  )
}
export default PatientCreate;