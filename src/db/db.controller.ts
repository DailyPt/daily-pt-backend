import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { DbService } from './db.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataResponse } from '../utils/swagger';
import { SupplementEntity } from '../entities/supplement.entity';
import { ExceptionHandler } from '../utils/ExceptionHandler';
import { Request, Response } from 'Express';

@Controller('db')
@UseFilters(new ExceptionHandler())
@ApiTags('DB API')
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @ApiOperation({
    summary: 'JSON 파일을 통한 식단 정보 DB 저장 API',
    description: 'JSON 파일을 통한 식단 정보를 DB에 저장한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, '영양제 정보 DB저장 완료!', SupplementEntity),
  )
  @Get('foods')
  async insertFoodDatas(@Req() req: Request, @Res() res: Response) {
    const message = await this.dbService.insertFoodDatas();

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: message,
    });
  }

  @ApiOperation({
    summary: 'JSON 파일을 통한 영양제 정보 DB 저장 API',
    description: 'JSON 파일을 통한 영양제 정보를 DB에 저장한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, '영양제 정보 DB저장 완료!', SupplementEntity),
  )
  @Get('supplements')
  async insertSupplementDatas(@Req() req: Request, @Res() res: Response) {
    const message = await this.dbService.insertSupplementDatas();

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: message,
    });
  }
}
