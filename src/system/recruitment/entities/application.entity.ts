import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity('applicationtable')
export class ApplicationTable {
  @PrimaryGeneratedColumn()
  applicationID: string;

  @Column()
  studentID: string;

  @Column()
  studentName: string;

  @Column()
  recruitmentID: string;

  @Column()
  sex: string;

  @Column()
  phoneNum: string;

  @Column()
  collegeCode: string;

  @Column()
  mojarCode: string;

  @Column()
  departmentCode: string;

  @Column()
  directionCode: string;

  @Column()
  userRole: string;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'boolean' })
  obey: boolean;

  /**
   * 0: 已报名
   * 1: 待录取
   * 2: 已录取
   */
  @Column({ type: 'enum', enum: [0, 1], default: 0 })
  status: number;

  @CreateDateColumn()
  createTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
