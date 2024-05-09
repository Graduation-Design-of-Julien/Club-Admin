import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  roleCode: number;

  @Column()
  roleName: string;

  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5], default: 1 })
  roleLevel: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  changeTime: Date;

  @Column()
  deleted: number;
}
