import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ default: '조연준', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly birth?: Date;

  @ApiProperty({ default: 'male', type: 'string' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly gender?: string;

  @ApiProperty({ default: 189.9, type: 'number' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly height?: number;

  @ApiProperty({ default: 85.4, type: 'number' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly weight?: number;
}
