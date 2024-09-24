import { Record } from 'src/patient-details/clinicRecord/entities/clinicRecord.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  NIN: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  homeAddress: string;

  @Column()
  dateOfRegistration: Date;

  @Column({ default: true })
  _22120612972: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Record, (record) => record.patient)
  record: Record;
}
