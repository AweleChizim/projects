type Record = {
    dateOfClinicVisit: Date;
    natureOfAilment: string;
    medicinePrescribed?: string;
    proceedureUndertaken?: string;
    nextAppointmentDate: Date;
    patient: {
        NIN: number;
        firstName: string;
        lastName: string;
        middleName?: string;
        dateOfBirth: Date;
        homeAddress?: string;
        dateOfRegistration: Date;
        _22120612972?: boolean;
    }
}
export type RecordFetched = {
    record: Record | null,
    error: string | null
}