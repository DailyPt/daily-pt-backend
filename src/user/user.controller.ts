import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataResponse } from '../utils/swagger';
import { SupplementEntity } from '../entities/supplement.entity';
import { Request, Response } from 'express';
import { ExceptionHandler } from '../utils/ExceptionHandler';
import { ResponseLoginDto } from './dto/response-login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

@Controller('user')
@UseFilters(new ExceptionHandler())
@ApiTags('USER API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', ResponseLoginDto))
  @Post('token/login')
  login(@Req() req: Request, @Res() res: Response) {
    const responseLoginDto: ResponseLoginDto = {
      uid: req.dbUser.uid,
      isProfileLogged: req.isProfileLogged,
    };

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '로그인 완료!',
      data: responseLoginDto,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'PROFILE UPDATE API',
    description: '토큰에 해당하는 사용자의 프로필을 수정한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, '프로필 수정 완료!', UpdateProfileDto),
  )
  @Post('token/profile')
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const profile: ProfileEntity = await this.userService.updateUserProfile(
      req.dbUser,
      updateProfileDto,
    );

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '프로필 수정 완료!',
      data: profile,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'PROFILE GET API',
    description: '토큰에 해당하는 사용자의 프로필을 요청한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, '프로필 조회 완료!', UpdateProfileDto),
  )
  @Get('token/profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '프로필 조회 완료!',
      data: req.dbUser.profile,
    });
  }
}
