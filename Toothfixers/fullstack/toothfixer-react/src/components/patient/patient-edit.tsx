import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { PatientFetched } from './type-defs';
import ShowPatient from './ShowPatient';

const PatientEdit: React.FC = () => {
    const [patientFetched, setPatientFetched] = useState<PatientFetched>({patient: null, error: null});
    const patientIdInput: MutableRefObject<HTMLInputElement | null> = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/patients/edit/${patientIdInput.current!.value}`);
            if (response.status < 200 || response.status > 299){
                setPatientFetched({patient: null, error: `No patient to display; Response status = ${response.status}`});
                return;
            }
            const data = await response.json();
            setPatientFetched({patient: data, error: null});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            setPatientFetched({patient: null, error: error.message});
        }
    };
    useEffect(() => {
        patientIdInput.current!.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);   
    return (
        <div className='flex flex-col space-y-3'>
            <div className='text-green-800 bg-green-300 font-bold w-full'>Edit Patient Information</div>
            <p>
                <input 
                    ref={patientIdInput}
                    type="text"
                    placeholder="PatientId (1 to 10) here"
                    defaultValue={1}
                />
            </p>
            <p>
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={fetchData}>
                Edit Patient
            </button>
            </p>
            <p>
                {patientIdInput.current && patientIdInput.current.value && (<ShowPatient patientFetched={patientFetched} />)}
            </p>
            <div className="grid-item-row-2"></div>
            
            <form className="box" id="editPatientForm" action="/api/patients" method="POST">
                <fieldset id="editPatientFormFieldSet" className="container">
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
                            <button type="submit" id="submitEditPatientForm" className="button font-bold text-green-800  bg-green-400 is-link is-small">Submit</button>
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
    );
};
export default PatientEdit;