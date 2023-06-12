import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDietDto {
  @ApiProperty({ default: 3, type: 'number' })
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({ default: '', type: 'string' })
  @IsNotEmpty()
  readonly memo: string;

  @ApiProperty({ default: 5, type: 'number' })
  @IsNotEmpty()
  readonly rating: number;

  @ApiProperty({ type: 'Date' })
  @IsNotEmpty()
  readonly date: string;
}
