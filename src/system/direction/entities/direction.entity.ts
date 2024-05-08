import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('direction')
export class Direction {
  @PrimaryGeneratedColumn()
  directionCode: number;

  @Column()
  directionName: string;

  @JoinColumn({ referencedColumnName: 'departmentCode' })
  departmentCode: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
