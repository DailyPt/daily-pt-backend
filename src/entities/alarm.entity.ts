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

  @ApiProperty({ default: 2, type: 'number' })
  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty({ default: 4, type: 'number' })
  @Column('int', { name: 'nutrient_id', nullable: false })
  nutrientId: number;

  @ApiProperty({ default: true })
  @Column('boolean', { name: 'sunday', default: false })
  sunday: boolean;

  @ApiProperty({ default: false })
  @Column('boolean', { name: 'monday', default: false })
  monday: boolean;

  @ApiProperty({ default: true })
  @Column('boolean', { name: 'tuesday', default: false })
  tuesday: boolean;

  @ApiProperty({ default: false })
  @Column('boolean', { name: 'wednesday', default: false })
  wednesday: boolean;

  @ApiProperty({ default: false })
  @Column('boolean', { name: 'thursday', default: false })
  thursday: boolean;

  @ApiProperty({ default: true })
  @Column('boolean', { name: 'friday', default: false })
  friday: boolean;

  @ApiProperty({ default: false })
  @Column('boolean', { name: 'saturday', default: false })
  saturday: boolean;

  @ApiProperty({ default: '13:00', type: 'string' })
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
