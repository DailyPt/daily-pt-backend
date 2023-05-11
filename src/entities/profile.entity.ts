import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'profile', orderBy: { id: 'ASC' } })
export class ProfileEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: '저스틴 비버', type: 'string' })
  @Column({ name: 'full_name', type: 'varchar' })
  name: string;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  height: number;

  @ApiProperty({ default: '68.2', type: 'number' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  weight: number;

  @ApiProperty({ default: '23', type: 'number' })
  @Column({ type: 'integer', default: 0 })
  age: number;

  @ApiProperty({ default: 'male', type: 'string' })
  @Column({ type: 'varchar', default: '' })
  gender: string;

  @ApiProperty({ default: '23.1', type: 'number' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bmi: number;

  @ApiProperty({ default: '2185.1', type: 'number' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bmr: number;

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
