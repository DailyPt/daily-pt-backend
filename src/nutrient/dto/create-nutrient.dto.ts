import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNutrientDto {
  @ApiProperty({ default: '5', type: 'number' })
  @IsNotEmpty()
  readonly supplementId: number;

  @ApiProperty({ default: 3, type: 'number' })
  @IsNotEmpty()
  readonly quantity: number;
}
