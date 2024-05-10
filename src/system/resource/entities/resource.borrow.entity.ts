import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ResourceBorrow {
  @PrimaryGeneratedColumn()
  borrowedID: string;

  @Column()
  uid: string;

  @Column()
  resourceID: string;

  // @Column({ type: 'datetime' })
  @CreateDateColumn()
  borrowTime: Date;

  @Column({ type: 'datetime' })
  returnTime: Date;

  @Column({ type: 'datetime' })
  realReturnTime: Date;

  @Column({ type: 'boolean', default: false })
  isReturn: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column({ default: 0 })
  deleted: number;
}
