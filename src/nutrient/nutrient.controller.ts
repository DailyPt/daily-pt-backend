import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { NutrientService } from './nutrient.service';
import { ExceptionHandler } from '../utils/ExceptionHandler';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataResponse } from '../utils/swagger';
import { Request, Response } from 'express';

@Controller('nutrient')
@UseFilters(new ExceptionHandler())
@ApiTags('NUTRIENT API')
export class NutrientController {
  constructor(private readonly nutrientService: NutrientService) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', null))
  @Get('token/nutrient')
  getAllNutrientByDate(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: null,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', null))
  @Post('token/nutrient')
  createNutrient(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: null,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', null))
  @Put('token/nutrient/:id')
  updateNutrient(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: null,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', null))
  @Delete('token/nutrient/:id')
  deleteNutrient(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: null,
    });
  }
}
