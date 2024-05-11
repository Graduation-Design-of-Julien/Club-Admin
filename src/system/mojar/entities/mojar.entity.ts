import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mojar')
export class Mojar {
  @PrimaryGeneratedColumn()
  mojarCode: number;

  @Column()
  mojarName: string;

  @Column()
  collegeCode: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column()
  deleted: number;
}
