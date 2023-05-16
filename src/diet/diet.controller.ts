import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { DietService } from './diet.service';
import { ExceptionHandler } from '../utils/ExceptionHandler';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArrayResponse, DataResponse } from '../utils/swagger';
import { Request, Response } from 'express';
import { FoodEntity } from '../entities/food.entity';

@Controller('diet')
@UseFilters(new ExceptionHandler())
@ApiTags('DIET API')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', null))
  @Get('token/diet/:id')
  getOneDiet(
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

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', null))
  @Get('token/diet')
  getAllDietByDate(
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

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: 'LOGIN API',
    description:
      '로그인하여 사용자가 프로필 기입이 필요한 지 판단하여 반환한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '로그인 완료!', null))
  @Post('token/diet')
  createDiet(@Req() req: Request, @Res() res: Response) {
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
  @Put('token/diet/:id')
  updateDiet(@Req() req: Request, @Res() res: Response) {
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
  @Delete('token/diet/:id')
  deleteDiet(
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

  @ApiOperation({
    summary: 'FOOD SEARCH API',
    description: '입력한 내용을 포함하는 음식을 반환한다.',
  })
  @ApiResponse(ArrayResponse(HttpStatus.OK, '음식 검색 완료!', FoodEntity))
  @Get('search')
  async searchFood(
    @Query('input') input: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const foods: FoodEntity[] = await this.dietService.getFoodByInput(input);

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: `음식 ${foods.length}개 검색 완료!`,
      data: foods,
    });
  }
}
