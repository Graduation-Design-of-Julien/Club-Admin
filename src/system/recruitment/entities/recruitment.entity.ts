import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recruitment')
export class Recruitment {
  @PrimaryGeneratedColumn()
  recruitmentID: string;

  @Column()
  recruitmentName: string;

  @Column()
  recruitmentTime: Date;

  @Column('simple-array', { nullable: true })
  recruitmentDepaList: string;

  @Column('simple-array', { nullable: true })
  recruitmentDirecList: string;

  @Column('simple-array', { nullable: true })
  recruitmentRoleList: string;

  @Column('simple-array', { nullable: true })
  collegeCodeList: string;

  @Column('simple-array', { nullable: true })
  mojarCodeList: string;

  /**
   * 0: 录取中
   * 1: 已结束
   */
  @Column({ type: 'enum', enum: [0, 1], default: 0 })
  status: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
