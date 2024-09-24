import React from "react";
import { PatientFetched } from "./type-defs";
type Props = {
  patientFetched: PatientFetched;
};
const ShowPatient: React.FC<Props> = ({ patientFetched }) => {
  const showPatient = () => {
    if (patientFetched.patient) {
      const patient = patientFetched.patient;
      return (
        <table className="border-separate border-spacing-2 border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">NIN</th>
              <th className="border border-slate-300">First Name</th>
              <th className="border border-slate-300">Middle Name</th>
              <th className="border border-slate-300">Last Name</th>
              <th className="border border-slate-300">Date of birth</th>
              <th className="border border-slate-300">Home Address</th>
              <th className="border border-slate-300">Date of Registration</th>
              <th className="border border-slate-300">_22120612972</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300">{patient.NIN}</td>
              <td className="border border-slate-300">{patient.firstName}</td>
              <td className="border border-slate-300">{patient.middleName}</td>
              <td className="border border-slate-300">{patient.lastName}</td>
              <td className="border border-slate-300">{patient.dateOfBirth.toString()}</td>
              <td className="border border-slate-300">{patient.homeAddress}</td>
              <td className="border border-slate-300">{patient.dateOfRegistration.toString()}</td>
              <td className="border border-slate-300">{patient._22120612972}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return `No patient to display: ${patientFetched.error}`;
    }
  };
  return <div>{showPatient()}</div>;
};
export default ShowPatient;
