import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patientBiodata.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
