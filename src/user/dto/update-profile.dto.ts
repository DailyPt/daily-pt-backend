import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ default: '조연준', type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: 'number', default: 1998 })
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @ApiProperty({ type: 'number', default: 11 })
  @IsNotEmpty()
  @IsNumber()
  readonly month: number;

  @ApiProperty({ type: 'number', default: 11 })
  @IsNotEmpty()
  @IsNumber()
  readonly day: number;

  @ApiProperty({ default: 'male', type: 'string' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female'])
  readonly gender: string;

  @ApiProperty({ default: 189.9, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  readonly height: number;

  @ApiProperty({ default: 85.4, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
}
