import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { ExceptionHandler } from '../utils/ExceptionHandler';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import { ArrayResponse, DataResponse } from '../utils/swagger';
import { FoodEntity } from '../entities/food.entity';
import { Request, Response } from 'express';
import { SupplementEntity } from '../entities/supplement.entity';
import { ApiFile } from '../utils/api-file.decorator';
import { CreateDietDto } from '../diet/dto/create-diet.dto';
import { AwsService } from '../aws/aws.service';

@Controller('search')
@UseFilters(new ExceptionHandler())
@ApiTags('SEARCH API')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly awsService: AwsService,
  ) {}

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

  @ApiOperation({
    summary: '식단 생성 API',
    description: '사용자의 식단을 생성한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '식단 생성 완료!', null))
  @ApiFile('photo')
  @Post('/test')
  async createDiet(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    photo: Express.Multer.File,
    @Body() createDietDto: CreateDietDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(photo);
    const diet: CreateDietDto = {
      foodId: Number(createDietDto.foodId),
      memo: createDietDto.memo,
      rating: Number(createDietDto.rating),
      date: createDietDto.date,
    };
    console.log(new Date(createDietDto.date));
    const { key, s3Object, contentType, url } =
      await this.awsService.uploadFileToS3('images', photo);
    console.log(`key : ${key}`);
    console.log(`s3Object : ${s3Object}`);
    console.log(`contentType : ${contentType}`);
    console.log(`url : ${url}`);

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: { name: photo.originalname, createDietDto: diet, url },
    });
  }
}
