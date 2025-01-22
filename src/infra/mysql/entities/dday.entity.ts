import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DdayDomain } from '../../../core/dday';
import { UserEntity } from './user.entity';

@Entity('dday')
export class DdayEntity implements DdayDomain {
  @PrimaryGeneratedColumn({ name: 'dday_id', unsigned: true, type: 'bigint' })
  ddayId: string;

  @Column({ name: 'user_id', nullable: false, type: 'int', unsigned: true })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'title', type: 'nvarchar', nullable: false })
  title: string;

  @Column({ name: 'color', type: 'char', nullable: false, length: 6 })
  color: string;

  @Column({
    name: 'target_datetime',
    nullable: false,
    type: 'int',
    unsigned: true,
  })
  targetDatetime: number;
}
