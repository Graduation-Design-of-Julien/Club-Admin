import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ResourceType {
  @PrimaryGeneratedColumn()
  resourceTypeID: string;

  @Column()
  resourceTypeName: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
