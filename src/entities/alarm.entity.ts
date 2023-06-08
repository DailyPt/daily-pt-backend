import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'alarm', orderBy: { id: 'ASC' } })
export class AlarmEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @Column('int', { name: 'nutrient_id', nullable: false })
  nutrientId: number;

  @Column('boolean', { name: 'sunday', default: false })
  sunday: boolean;

  @Column('boolean', { name: 'monday', default: false })
  monday: boolean;

  @Column('boolean', { name: 'tuesday', default: false })
  tuesday: boolean;

  @Column('boolean', { name: 'wednesday', default: false })
  wednesday: boolean;

  @Column('boolean', { name: 'thursday', default: false })
  thursday: boolean;

  @Column('boolean', { name: 'friday', default: false })
  friday: boolean;

  @Column('boolean', { name: 'saturday', default: false })
  saturday: boolean;

  @Column('varchar', { name: 'time' })
  time: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date | undefined;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date | undefined;

  @Column('boolean', { name: 'is_deleted', default: false })
  isDeleted: boolean;
}
