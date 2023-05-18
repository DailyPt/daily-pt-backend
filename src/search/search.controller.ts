import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ExceptionHandler } from '../utils/ExceptionHandler';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { ArrayResponse } from '../utils/swagger';
import { FoodEntity } from '../entities/food.entity';
import { Request, Response } from 'express';
import { SupplementEntity } from '../entities/supplement.entity';

@Controller('search')
@UseFilters(new ExceptionHandler())
@ApiTags('SEARCH API')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({
    summary: '음식 검색 API',
    description: '입력한 내용을 포함하는 음식을 반환한다.',
  })
  @ApiResponse(ArrayResponse(HttpStatus.OK, '음식 검색 완료!', FoodEntity))
  @Get('food')
  async searchFood(
    @Query('input') input: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const foods: FoodEntity[] = await this.searchService.getFoodByInput(input);

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: `음식 ${foods.length}개 검색 완료!`,
      data: foods,
    });
  }

  @ApiOperation({
    summary: '영양제 검색 API',
    description: '입력한 내용을 포함하는 영양제를 반환한다.',
  })
  @ApiResponse(
    ArrayResponse(HttpStatus.OK, '영양제 검색 완료!', SupplementEntity),
  )
  @Get('supplement')
  async searchSupplement(
    @Query('input') input: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const supplements: SupplementEntity[] =
      await this.searchService.getSupplementByInput(input);

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: `영양제 ${supplements.length}개 검색 완료!`,
      data: supplements,
    });
  }
}
