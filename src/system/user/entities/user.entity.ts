import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  uid: string;

  @Column()
  pwd: string;

  @Column()
  userName: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  nativePlace: string;

  @Column()
  phoneNum: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  cardNum: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string;

  @Column({ type: 'text' })
  introduction: string;

  @Column()
  departmentCode: number;

  @Column()
  directionCode: number;

  @Column()
  userRole: number;

  @Column()
  collegeCode: number;

  @Column()
  mojarCode: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
