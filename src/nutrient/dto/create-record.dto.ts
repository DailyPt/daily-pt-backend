import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty({ default: '5', type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  readonly nutrientId: number;

  @ApiProperty()
  @IsOptional()
  readonly date: Date;
}
