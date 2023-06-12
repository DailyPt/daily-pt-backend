import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'record', orderBy: { id: 'ASC' } })
export class RecordEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: 3, type: 'number' })
  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty({ default: 7, type: 'number' })
  @Column('int', { name: 'nutrient_id', nullable: false })
  nutrientId: number;

  @ApiProperty({
    default: 'Thu May 18 2023 18:51:40 GMT+0900 (한국 표준시)',
    type: 'string',
  })
  @Column('varchar', { name: 'date' })
  date: string;

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
