/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ShowRecord from './ShowRecord'
import { RecordFetched } from './type-defs';
type Props = {
name?: string;
}

const RecordDelete: React.FC<Props> = () => {
    const [recordFetched, setRecordFetched] = useState<RecordFetched>({record: null, error: null});
    const recordIdInput: MutableRefObject<HTMLInputElement | null> = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/records/delete/${recordIdInput.current!.value}`);
            if (response.status < 200 || response.status > 299){
                setRecordFetched({record: null, error: `No record to display; Response status = ${response.status}`});
                return;
            }
            const data = await response.json();
            setRecordFetched({record: data, error: null});
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
            <div className='text-green-800 bg-green-300 font-bold w-full'>Delete Record</div>
            <p>
                <input 
                    ref={recordIdInput}
                    type="text"
                    placeholder="Record Id here"
                    defaultValue={1}
                />
            </p>
            <p>
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={fetchData}>
                Delete record
            </button>
        </p>
        <p>
            {recordIdInput.current && recordIdInput.current.value && (<ShowRecord recordFetched={recordFetched} />)}
        </p>
        </div>
    );
};
export default RecordDelete;