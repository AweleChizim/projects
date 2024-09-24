import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordDto } from './create-clinicRecord.dto';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {}
