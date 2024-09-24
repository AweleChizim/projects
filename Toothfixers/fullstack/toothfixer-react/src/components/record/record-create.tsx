import React from 'react';

const RecordCreate: React.FC = () => {
  return (
    <>
        <div className="grid-item-row-2">
          <h1 className="font-bold text-green-800 bg-green-300 w-full'">Register a new patient</h1>
          <form className="box" id="createPatientForm" action="/api/patients" method="POST">
              <fieldset id="createPatientFormFieldSet" className="container">
              <div className="field flex">
                        <label className="label text-green-700">Date of Clinic Visit:</label>
                        <div className="control has-icons-right">
                            <input className="input" id="dateofClinicVisit" name="dateofClinicVisit" type="date" placeholder="" required></input>
                        </div>
                    </div>
                    <br></br>
                    <div className="field flex">
                        <label className="label text-green-700">Nature of Ailment: </label>
                        <div className="control has-icons-right">
                            <input className="input" id="natureofAilment" name="natureofAilment" type="text" placeholder="Nature of Ailment" required></input>
                        </div>
                    </div>
                    <br></br>
                    <div className="field flex">
                        <label className="label text-green-700">Medicine Prescribed:</label>
                        <div className="control has-icons-right">
                            <input className="input" id="medicinePrescribed" name="medicinePrescribed" type="text" placeholder="Medicine Prescribed"></input>
                        </div>
                    </div>
                    <br></br>
                    <div className="field flex">
                        <label className="label text-green-700">Procedure Undertaken:</label>
                        <div className="control has-icons-right">
                            <input className="input" id="procedureUndertaken" name="procedureUndertaken" type="text" placeholder="Procedure Undertaken"></input>
                        </div>
                    </div>
                    <br></br>
                    <div className="field flex">
                        <label className="label text-green-700">Date of Next Appointment:</label>
                        <div className="control has-icons-right">
                            <input className="input" id="dateOfNextAppointment" name="dateOfNextAppointment" type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="yyyy-mm-dd"></input>
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
export default RecordCreate;