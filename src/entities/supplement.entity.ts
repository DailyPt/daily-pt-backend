import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'supplement', orderBy: { id: 'ASC' } })
export class SupplementEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ type: 'varchar', default: '', nullable: true })
  enterprise: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({
    name: 'product_name',
    type: 'varchar',
    default: '',
    nullable: true,
  })
  productName: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'distb_pd', type: 'varchar', default: '', nullable: true })
  distbPd: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ type: 'varchar', default: '', nullable: true })
  feature: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'srv_use', type: 'varchar', default: '', nullable: true })
  srvUse: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'prsrv_pd', type: 'varchar', default: '', nullable: true })
  prsrvPd: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'intake_hint', type: 'varchar', default: '', nullable: true })
  intakeHint: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'main_func', type: 'varchar', default: '', nullable: true })
  mainFunc: string;

  @ApiProperty({ default: '178.9', type: 'string' })
  @Column({ name: 'base_std', type: 'varchar', default: '', nullable: true })
  baseStd: string;

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
