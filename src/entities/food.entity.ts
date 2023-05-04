import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'food', orderBy: { id: 'ASC' } })
export class FoodEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'food_group', type: 'varchar', default: '', nullable: true })
  foodGroup: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'desc_kor', type: 'varchar', default: '', nullable: true })
  descKor: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'maker_name', type: 'varchar', default: '', nullable: true })
  makerName: string;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  kcal: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  carbohydrate: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  protein: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  fat: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  sugar: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  sodium: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  cholesterol: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    name: 'saturated_fat',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  saturatedFat: number;

  @ApiProperty({ default: '178.9', type: 'number' })
  @Column({
    name: 'trans_fat',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  transFat: number;

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
