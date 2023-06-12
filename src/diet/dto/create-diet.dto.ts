import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDietDto {
  @ApiProperty({ default: '5', type: 'number' })
  @IsNotEmpty()
  readonly foodId: number;

  @ApiProperty({ default: 3, type: 'number' })
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({ default: '', type: 'string' })
  @IsOptional()
  readonly memo: string;

  @ApiProperty({ default: 5, type: 'number' })
  @IsNotEmpty()
  readonly rating: number;

  @ApiProperty({ type: 'Date', default: '2023-06-08T03:55:03.671Z' })
  @IsNotEmpty()
  readonly date: string;
}
