import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mojar')
export class Mojar {
  @PrimaryGeneratedColumn()
  mojarCode: number;

  @Column()
  mojarName: string;

  @JoinColumn({ referencedColumnName: 'collegeCode' })
  collegeCode: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column()
  deleted: number;
}
