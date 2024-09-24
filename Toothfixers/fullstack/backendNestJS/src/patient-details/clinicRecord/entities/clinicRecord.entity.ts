import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from 'src/patient-details/patientBiodata/entities/patientBiodata.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateOfClinicVisit: Date;

  @Column()
  natureOfAilment: string;

  @Column({ nullable: true })
  medicinePrescribed: string;

  @Column({ nullable: true })
  proceedureUndertaken: string;

  @Column({ nullable: true })
  nextAppointmentDate: Date;

  @JoinColumn()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Patient, (patient) => patient.record, { cascade: true })
  patient: Patient;
}
