/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto) {
    const newflight = this.flightRepository.create(createFlightDto);

    return await this.flightRepository.save(newflight);
  }

  async findAll() {
    return await this.flightRepository.find();
  }

  async findOne(id: number) {
    return await this.flightRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    const updatedFlight = await this.flightRepository.findOne({
      where: { id },
    });

    Object.assign(updatedFlight, updateFlightDto);
    return await this.flightRepository.save(updatedFlight);
  }

  async remove(id: number) {
    const deletedFlight = await this.flightRepository.findOne({
      where: { id },
    });

    return await this.flightRepository.remove(deletedFlight);
  }
}
