import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SupplementEntity } from './supplement.entity';

@Entity({ name: 'nutrient', orderBy: { id: 'ASC' } })
export class NutrientEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: 3, type: 'number' })
  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty()
  @OneToOne((type) => SupplementEntity, { cascade: true })
  @JoinColumn()
  supplement: SupplementEntity;

  @ApiProperty({ default: 3, type: 'number' })
  @Column('int', { name: 'quantity', nullable: false })
  quantity: number;

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
