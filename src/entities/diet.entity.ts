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
import { FoodEntity } from './food.entity';

@Entity({ name: 'diet', orderBy: { id: 'ASC' } })
export class DietEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty()
  @OneToOne((type) => FoodEntity, { cascade: true })
  @JoinColumn()
  food: FoodEntity;

  @Column('int', { name: 'quantity', nullable: false })
  quantity: number;

  @Column('varchar', { name: 'photo_link', nullable: false })
  photoLink: string;

  @Column('varchar', { name: 'memo', nullable: false })
  memo: string;

  @Column('int', { name: 'rating', nullable: false })
  rating: number;

  @Column('varchar', { name: 'date', nullable: false })
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
