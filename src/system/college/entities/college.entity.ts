import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('college')
export class College {
  @PrimaryGeneratedColumn()
  collegeCode: number;

  @Column()
  collegeName: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column()
  deleted: number;
}
