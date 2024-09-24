/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ShowPatient from './ShowPatient'
import { PatientFetched } from './type-defs';
type Props = {
name?: string;
}

const PatientDelete: React.FC<Props> = () => {
    const [patientFetched, setPatientFetched] = useState<PatientFetched>({patient: null, error: null});
    const patientIdInput: MutableRefObject<HTMLInputElement | null> = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/patients/delete/${patientIdInput.current!.value}`);
            if (response.status < 200 || response.status > 299){
                setPatientFetched({patient: null, error: `No patient to display; Response status = ${response.status}`});
                return;
            }
            const data = await response.json();
            setPatientFetched({patient: data, error: null});
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
            <div className='text-green-800 bg-green-300 font-bold w-full'>Delete Patient Information</div>
            <p>
                <input 
                    ref={patientIdInput}
                    type="text"
                    placeholder="UserId (1 to 10) here"
                    defaultValue={1}
                />
            </p>
            <p>
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={fetchData}>
                Delete Patient
            </button>
        </p>
        <p>
            {patientIdInput.current && patientIdInput.current.value && (<ShowPatient patientFetched={patientFetched} />)}
        </p>
        </div>
    );
};
export default PatientDelete;