import { Module } from '@nestjs/common';
import { PatientsModule } from './patientBiodata/patientsBiodata.module';
import { RecordsModule } from './clinicRecord/clinicRecords.module';

@Module({
  imports: [PatientsModule, RecordsModule],
})
export class PatientRegistrationModule {}
