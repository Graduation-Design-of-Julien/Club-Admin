import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('verifycode')
export class VerifyCode {
  @PrimaryColumn()
  phoneNum: string;

  @Column()
  time: string;

  @Column({ nullable: true })
  verifyCode: string;
}
