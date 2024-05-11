import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resourceborrow')
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
