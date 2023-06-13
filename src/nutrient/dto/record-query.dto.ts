import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRecordQuery {
  @ApiProperty({ default: 3, type: 'number' })
  @IsString()
  @IsOptional()
  date?: string;
}
