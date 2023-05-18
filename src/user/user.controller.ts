import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataResponse } from '../utils/swagger';
import { Request, Response } from 'express';
import { ExceptionHandler } from '../utils/ExceptionHandler';
import { ResponseLoginDto } from './dto/response-login.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
@UseFilters(new ExceptionHandler())
@ApiTags('USER API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '로그인 API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', ResponseLoginDto))
  @Post('login')
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
    summary: '프로필 생성 API',
    description: '토큰에 해당하는 사용자의 프로필을 생성한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '프로필 생성 완료!', ProfileDto))
  @Post('profile')
  async createProfile(
    @Body() profileDto: ProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: UserEntity = await this.userService.createUserProfile(
      req.dbUser,
      profileDto,
    );

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '프로필 생성 완료!',
      data: user.profile,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '프로필 수정 API',
    description: '토큰에 해당하는 사용자의 프로필을 수정한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '프로필 수정 완료!', ProfileDto))
  @Put('profile')
  async updateProfile(
    @Body() profileDto: ProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: UserEntity = await this.userService.updateUserProfile(
      req.dbUser,
      profileDto,
    );

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '프로필 수정 완료!',
      data: user.profile,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '프로필 조회 API',
    description: '토큰에 해당하는 사용자의 프로필을 요청한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '프로필 조회 완료!', ProfileDto))
  @Get('profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    if (!req.isProfileLogged)
      throw new HttpException(
        'user profile is not exist.',
        HttpStatus.BAD_REQUEST,
      );

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '프로필 조회 완료!',
      data: req.dbUser.profile,
    });
  }
}
