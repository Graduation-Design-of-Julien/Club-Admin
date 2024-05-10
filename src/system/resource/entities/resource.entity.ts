import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Resource {
  @PrimaryGeneratedColumn()
  resourceID: string;

  @Column()
  resourceTypeID: string;

  @Column()
  resourceName: string;

  /**
   * 0: 在库
   * 1: 离库
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
