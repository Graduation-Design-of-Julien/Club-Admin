import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resourcetype')
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
