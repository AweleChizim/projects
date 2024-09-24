import { CreatePatientDto } from 'src/patient-details/patientBiodata/dto/create-patientBiodata.dto';

export class CreateRecordDto {
  readonly dateOfClinicVisit: Date;
  readonly natureOfAilment: string;
  readonly medicinePrescribed?: string;
  readonly proceedureUndertaken?: string;
  readonly nextAppointmentDate: Date;
  readonly patient: CreatePatientDto;
}
