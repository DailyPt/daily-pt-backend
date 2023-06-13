import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNutrientDto {
  @ApiProperty({ default: '5', type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  readonly supplementId: number;

  @ApiProperty({ default: 3, type: 'number' })
  @IsOptional()
  @IsNumber()
  readonly count: number;

  @ApiProperty({ default: 3, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly times: string[];

  @ApiProperty()
  @IsNotEmpty()
  readonly days: number[];
}
