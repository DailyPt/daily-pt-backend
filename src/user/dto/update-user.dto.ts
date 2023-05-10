import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ default: 'nickname', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly nickname?: string;

  @ApiProperty({ default: 'name', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly birth?: Date;

  @ApiProperty({ default: 'phone', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly phone?: string;

  @ApiProperty({ default: 'github', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly github?: string;

  @ApiProperty({ default: 'jungol', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly jungol?: string;

  @ApiProperty({ default: 'baekjoon', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly baekjoon?: string;

  @ApiProperty({ default: 'kaggle', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly kaggle?: string;
}
