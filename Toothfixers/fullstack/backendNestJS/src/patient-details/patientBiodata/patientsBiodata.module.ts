import { Module } from '@nestjs/common';
import { PatientsService } from './patientsBiodata.service';
import { PatientsController } from './patientsBiodata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patientBiodata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
