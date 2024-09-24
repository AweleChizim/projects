import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { RecordFetched } from './type-defs';
import ShowRecord from './ShowRecord';

const RecordEdit: React.FC = () => {
    const [recordFetched, setRecordFetched] = useState<RecordFetched>({record: null, error: null});
    const recordIdInput: MutableRefObject<HTMLInputElement | null> = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/records/edit/${recordIdInput.current!.value}`);
            if (response.status < 200 || response.status > 299){
                setRecordFetched({record: null, error: `No record to display; Response status = ${response.status}`});
                return;
            }
            const data = await response.json();
            setRecordFetched({record: data, error: null});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            setRecordFetched({record: null, error: error.message});
        }
    };
    useEffect(() => {
        recordIdInput.current!.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);   
    return (
        <div className='flex flex-col space-y-3'>
            <div className='text-green-800 bg-green-300 font-bold w-full'>Edit Patient's Record</div>
            <p>
                <input 
                    ref={recordIdInput}
                    type="text"
                    placeholder="RecordId here"
                    defaultValue={1}
                />
            </p>
            <p>
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={fetchData}>
                Edit Record
            </button>
            </p>
            <p>
                {recordIdInput.current && recordIdInput.current.value && (<ShowRecord recordFetched={recordFetched} />)}
            </p>
            <div className="grid-item-row-2"></div>
            <h1 className="font-bold text-green-800 bg-green-300 w-full'">Edit Record</h1>
            <form className="box" id="editrecordForm" action="/api/records" method="POST">
                <fieldset id="editrecordFormFieldSet" className="container">
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
                    <br></br>
                    <div className="field is-grouped">
                        <div className="control">
                            <button type="submit" id="submitEditrecordForm" className="button font-bold text-green-800  bg-green-400 is-link is-small">Submit</button>
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
export default RecordEdit;