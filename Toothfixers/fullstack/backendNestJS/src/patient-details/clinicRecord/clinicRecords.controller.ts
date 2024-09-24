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
import { RecordsService } from './clinicRecords.service';
import { CreateRecordDto } from './dto/create-clinicRecord.dto';
import { UpdateRecordDto } from './dto/update-clinicRecord.dto';

@Controller('/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }
  @Get('create')
  @Render('records/create-record.html')
  createForm() {}

  @Get()
  findAll() {
    return this.recordsService.findAll();
  }
  @Get('view')
  //@Render('records/view-all-records.html')
  findAll2() {
    return this.recordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }
  @Get('view/:id')
  //@Render('records/view-record.html')
  findOne2(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updaterecordDto: UpdateRecordDto) {
    return this.recordsService.update(+id, updaterecordDto);
  }
  @Get('edit/:id')
  @Render('records/edit-record.html')
  update2(@Param('id') id: string, @Body() updaterecordDto: UpdateRecordDto) {
    return this.recordsService.update(+id, updaterecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }
  @Get('delete/:id')
  //@Render('records/delete-record.html')
  remove2(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }
}
