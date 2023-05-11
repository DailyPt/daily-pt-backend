import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty({ default: '1i2ufxfd98fd8d!DF1', type: 'string' })
  readonly uid: string;

  @ApiProperty({ default: false, type: 'boolean' })
  readonly isProfileLogged: boolean;
}
