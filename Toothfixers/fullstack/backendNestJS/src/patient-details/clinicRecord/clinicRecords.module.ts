import { Module } from '@nestjs/common';
import { RecordsService } from './clinicRecords.service';
import { RecordsController } from './clinicRecords.controller';
import { Record } from './entities/clinicRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patientBiodata/entities/patientBiodata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Patient])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
