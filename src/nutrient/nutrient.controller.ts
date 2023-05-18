import {
  Body,
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
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';

@Controller('nutrient')
@UseFilters(new ExceptionHandler())
@ApiTags('NUTRIENT API')
export class NutrientController {
  constructor(private readonly nutrientService: NutrientService) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '특정 영양제 조회 API',
    description: '사용자의 특정 id에 해당하는 영양제를 조회한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, 'id : 4, 영양제 조회 완료!', null))
  @Get(':id')
  getOneNutrient(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: `id : ${id}, 영양제 조회 완료`,
      data: null,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '모든 영양제 조회 API',
    description: '사용자의 특정 날짜에 해당하는 모든 영양제를 조회한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '5개 영양제 조회 완료!', null))
  @Get('')
  getAllNutrientByDate(
    @Query('start') start: string,
    @Query('end') end: string,
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
    summary: '삭제된 영양제 조회 API',
    description: '삭제된 지 30일이 넘지 않은 영양제 조회',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '삭제된 영양제 조회 완료!', null))
  @Get('trash')
  getSoftDeletedNutrients(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: null,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '영양제 생성 API',
    description: '사용자의 영양제를 생성한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '영양제 생성 완료!', null))
  @Post('')
  createNutrient(
    @Body() createNutrientDto: CreateNutrientDto,
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
    summary: '영양제 수정 API',
    description: '사용자의 특정 영양제를 수정한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '영양제 수정 완료!', null))
  @Put(':id')
  updateNutrient(
    @Param('id') id: number,
    @Body() updateNutrientDto: UpdateNutrientDto,
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
    summary: '영양제 삭제 API',
    description:
      '사용자의 특정 영양제를 부드러운 삭제한다. (30일 내로 복원 가능)',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '영양제 삭제 완료 완료!', null))
  @Delete(':id')
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
