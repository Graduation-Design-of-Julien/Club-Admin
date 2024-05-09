import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('direction')
export class Direction {
  @PrimaryGeneratedColumn()
  directionCode: number;

  @Column()
  directionName: string;

  @Column()
  departmentCode: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
