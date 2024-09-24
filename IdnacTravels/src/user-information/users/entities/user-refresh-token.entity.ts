import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userrefreshtokens' })
export class UserRefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userToken: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  expiryDate: Date;
}
