import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  airlineName: string;

  @Column()
  flightNo: string;

  @Column()
  price: number;

  @Column()
  departureAirport: string;

  @Column()
  arrivalAirport: string;

  @Column()
  departureDateTime: Date;

  @Column()
  arrivalDateTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
