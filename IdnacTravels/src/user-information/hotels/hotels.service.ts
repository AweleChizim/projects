/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    const newhotel = this.hotelRepository.create(createHotelDto);

    return await this.hotelRepository.save(newhotel);
  }

  async findAll() {
    return await this.hotelRepository.find();
  }

  async findOne(id: number) {
    return await this.hotelRepository.findOne({ where: { id } });
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const updatedHotel = await this.hotelRepository.findOne({
      where: { id },
    });

    Object.assign(updatedHotel, updateHotelDto);
    return await this.hotelRepository.save(updatedHotel);
  }

  async remove(id: number) {
    const deletedHotel = await this.hotelRepository.findOne({
      where: { id },
    });

    return await this.hotelRepository.remove(deletedHotel);
  }
}
