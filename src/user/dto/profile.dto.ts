import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({ default: '조연준', type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: 'string', default: '1998/11/11' })
  @IsNotEmpty()
  @IsString()
  readonly birth: string;

  @ApiProperty({ default: 'male', type: 'string' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female'])
  readonly gender: string;

  @ApiProperty({ default: 189.9, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  readonly height: number;

  @ApiProperty({ default: 85.4, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
}
