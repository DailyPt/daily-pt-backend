import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRecordQuery {
  @ApiProperty({
    default: new Date().toISOString(),
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  date?: string;
}
