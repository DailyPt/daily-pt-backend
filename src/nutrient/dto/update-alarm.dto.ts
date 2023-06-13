import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlarmDto {
  @ApiProperty({ default: '12:34', type: 'string' })
  @IsNotEmpty()
  readonly time: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly days: number[];
}
