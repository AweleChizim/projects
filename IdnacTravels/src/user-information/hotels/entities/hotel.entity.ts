import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'hotels' })
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelName: string;

  @Column()
  roomNo: string;

  @Column()
  price: number;

  @Column()
  checkInDateTime: Date;

  @Column()
  checkOutDateTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
