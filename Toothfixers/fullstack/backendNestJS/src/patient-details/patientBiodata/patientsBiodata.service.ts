import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patientBiodata.dto';
import { UpdatePatientDto } from './dto/update-patientBiodata.dto';
import { Patient } from './entities/patientBiodata.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const newPatient: Patient =
      this.patientsRepository.create(createPatientDto);
    return this.patientsRepository.save(newPatient);
    //return 'This action adds a new patient';
  }
  async findAll() {
    //return `This action returns all patients`;
    // eslint-disable-next-line prefer-const
    return await this.patientsRepository.find();
  }

  async findOne(id: number) {
    //return `This action returns a #${id} patient`;
    // eslint-disable-next-line prefer-const
    return await this.patientsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    //return `This action updates a #${id} patient`;
    // eslint-disable-next-line prefer-const
    return await this.patientsRepository.update(id, updatePatientDto);
  }

  async remove(id: number) {
    //return `This action removes a #${id} patient`;
    // eslint-disable-next-line prefer-const
    return await this.patientsRepository.delete(id);
  }
}
