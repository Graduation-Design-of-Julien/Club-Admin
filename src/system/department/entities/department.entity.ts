import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn()
  departmentCode: number;

  @Column()
  departmentName: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
