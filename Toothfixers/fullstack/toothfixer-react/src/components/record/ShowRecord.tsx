import React from "react";
import { RecordFetched } from "./type-defs";
type Props = {
  recordFetched: RecordFetched;
};
const ShowRecord: React.FC<Props> = ({ recordFetched }) => {
  const showRecord = () => {
    if (recordFetched.record) {
      const record = recordFetched.record;
      return (
        <table className="border-separate border-spacing-2 border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">First Name</th>
              <th className="border border-slate-300">Last Name</th>
              <th className="border border-slate-300">Date of Clinic Visit</th>
              <th className="border border-slate-300">Nature of Ailment</th>
              <th className="border border-slate-300">Medicine Prescribed</th>
              <th className="border border-slate-300">Proceedure Undertaken</th>
              <th className="border border-slate-300">Next Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300">{record.patient.firstName}</td>
              <td className="border border-slate-300">{record.patient.lastName}</td>
              <td className="border border-slate-300">{record.dateOfClinicVisit.toString()}</td>
              <td className="border border-slate-300">{record.natureOfAilment}</td>
              <td className="border border-slate-300">{record.medicinePrescribed}</td>
              <td className="border border-slate-300">{record.proceedureUndertaken}</td>
              <td className="border border-slate-300">{record.nextAppointmentDate.toString()}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return `No record to display: ${recordFetched.error}`;
    }
  };
  return <div>{showRecord()}</div>;
};
export default ShowRecord;
