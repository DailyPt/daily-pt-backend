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
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'user', orderBy: { id: 'ASC' } })
export class UserEntity extends BaseEntity {
  @ApiProperty({ default: 729, type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: 'code@start.today', type: 'string' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ default: '저스틴 비버', type: 'string' })
  @Column({ type: 'varchar', nullable: true })
  name: string;

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

  @ApiProperty()
  @OneToOne((type) => ProfileEntity, { cascade: true })
  @JoinColumn({ name: 'contact' })
  profile: ProfileEntity;
}
