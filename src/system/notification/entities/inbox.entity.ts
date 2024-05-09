import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('inbox')
export class Inbox {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  notificationID: string;

  @Column()
  recipientID: string;

  /**
   * 1: 未读
   * 2: 已读
   * 3: 标记
   */
  @Column({ type: 'enum', enum: [1, 2, 3] })
  status: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
