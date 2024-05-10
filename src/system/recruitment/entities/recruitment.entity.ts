import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Recruitment {
  @PrimaryGeneratedColumn()
  recruitmentID: string;

  @Column()
  recruitmentName: string;

  @Column()
  recruitmentTime: Date;

  @Column('simple-array')
  recruitmentDepaList: string;

  @Column('simple-array')
  recruitmentDirecList: string;

  @Column('simple-array')
  recruitmentRoleList: string;

  @Column('simple-array')
  collegeCodeList: string;

  @Column('simple-array')
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
