type Patient = {
    NIN: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: Date;
    homeAddress?: string;
    dateOfRegistration: Date;
    _22120612972?: boolean;
}
export type PatientFetched = {
    patient: Patient | null,
    error: string | null
}