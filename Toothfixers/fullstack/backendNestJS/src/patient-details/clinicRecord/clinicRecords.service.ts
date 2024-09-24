import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../patientBiodata/entities/patientBiodata.entity';
import { CreateRecordDto } from './dto/create-clinicRecord.dto';
import { UpdateRecordDto } from './dto/update-clinicRecord.dto';
import { Record } from './entities/clinicRecord.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,

    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    //return 'This action adds a new record';
    const newRecord = this.recordRepository.create(createRecordDto);
    //ideally, below should be wrapped in a transaction so that it can roll back if there is error in any of the stages.
    if (createRecordDto.patient) {
      const newPatient = this.patientRepository.create(createRecordDto.patient);
      const patient: Patient = await this.patientRepository.save(newPatient);
      newRecord.patient = patient;
    }
    return this.recordRepository.save(newRecord);
  }

  async findAll() {
    //return `This action returns all records`;
    // eslint-disable-next-line prefer-const
    return await this.recordRepository.find({
      relations: ['patient'],
    });
  }

  async findOne(id: number) {
    //return `This action returns a #${id} record`;
    // eslint-disable-next-line prefer-const
    return await this.recordRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    //return `This action updates a #${id} record`;
    // eslint-disable-next-line prefer-const
    return await this.recordRepository.update(id, updateRecordDto);
  }

  async remove(id: number) {
    //return `This action removes a #${id} record`;
    // eslint-disable-next-line prefer-const
    return await this.recordRepository.delete(id);
  }

  /* Work on relationships */
  async setPatientById(recordId: number, patientId: number) {
    try {
      return await this.recordRepository
        .createQueryBuilder()
        .relation(Record, 'patient')
        .of(recordId)
        .set(patientId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem setting patient for record: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async unsetPatientById(recordId: number) {
    try {
      return await this.recordRepository
        .createQueryBuilder()
        .relation(Record, 'patient')
        .of(recordId)
        .set(null);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem unsetting patient for record: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
