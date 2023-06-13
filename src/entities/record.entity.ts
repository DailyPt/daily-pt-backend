import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { NutrientEntity } from './nutrient.entity';

@Entity({ name: 'record', orderBy: { id: 'ASC' } })
export class RecordEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: 3, type: 'number' })
  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty()
  @ManyToOne((type) => NutrientEntity, { cascade: true })
  @JoinColumn()
  nutrient: NutrientEntity;

  @ApiProperty({ default: '2023/06/07 12:32', type: 'string' })
  @Column('timestamp', { name: 'date', nullable: false })
  date: Date;

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
