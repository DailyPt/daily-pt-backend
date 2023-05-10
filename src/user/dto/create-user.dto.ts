import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: '1i2ufxfd98fd8d!DF1', type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly uid: string;
}
