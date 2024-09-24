import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { PatientsService } from './patientsBiodata.service';
import { CreatePatientDto } from './dto/create-patientBiodata.dto';
import { UpdatePatientDto } from './dto/update-patientBiodata.dto';

@Controller('/patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }
  @Get('create')
  @Render('patients/create-patient.html')
  createForm() {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }
  @Get('view')
  //@Render('patients/view-all-patients.html')
  findAll2() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }
  @Get('view/:id')
  //@Render('patients/view-patient.html')
  findOne2(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }
  @Get('edit/:id')
  @Render('patients/edit-patient.html')
  update2(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
  @Get('delete/:id')
  //@Render('patients/delete-patient.html')
  remove2(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
