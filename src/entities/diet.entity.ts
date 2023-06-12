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

  @ApiProperty({ default: 3, type: 'number' })
  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty()
  @OneToOne((type) => FoodEntity, { cascade: true })
  @JoinColumn()
  food: FoodEntity;

  @ApiProperty({ default: 2, type: 'number' })
  @Column('int', { name: 'quantity', nullable: false })
  quantity: number;

  @ApiProperty({
    default: 'https://daily-pt.s3.amazonaws.com/images/1686240801882.jpg',
    type: 'string',
  })
  @Column('varchar', { name: 'photo_link', nullable: false })
  photoLink: string;

  @ApiProperty({ default: '너무 맛있는 음식~', type: 'string' })
  @Column('varchar', { name: 'memo', nullable: false })
  memo: string;

  @ApiProperty({ default: 4, type: 'number' })
  @Column('int', { name: 'rating', nullable: false })
  rating: number;

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
