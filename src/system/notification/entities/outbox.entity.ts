import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('outbox')
export class Outbox {
  @PrimaryColumn()
  notificationID: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  sender: string;

  /**
   * 0: 草稿箱（未发送）
   * 1: 已发送
   */
  @Column({ type: 'enum', enum: [0, 1] })
  status: number;

  @Column('simple-array')
  recipients: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
