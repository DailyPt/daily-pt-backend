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

  @ApiProperty({ default: 729, type: 'number' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  uid: string;

  @ApiProperty({ default: 'code@start.today', type: 'string' })
  @Column({ type: 'varchar', nullable: false })
  email: string;

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
  @JoinColumn()
  profile: ProfileEntity;
}
