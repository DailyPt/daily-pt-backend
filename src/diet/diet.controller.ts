import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
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
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { ApiFile } from '../utils/api-file.decorator';

@Controller('diet')
@UseFilters(new ExceptionHandler())
@ApiTags('DIET API')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '특정 식단 조회 API',
    description: '사용자의 특정 id에 해당하는 식단을 조회한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, 'id : 4, 식단 조회 완료!', null))
  @Get(':id')
  getOneDiet(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: `id : ${id}, 식단 조회 완료`,
      data: null,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '모든 식단 조회 API',
    description: '사용자의 특정 날짜에 해당하는 모든 식단을 조회한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '5개 식단 조회 완료!', null))
  @Get('')
  getAllDietByDate(
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
    summary: '삭제된 식단 조회 API',
    description: '삭제된 지 30일이 넘지 않은 식단 조회',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '삭제된 식단 조회 완료!', null))
  @Get('trash')
  getSoftDeletedDiets(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: null,
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '식단 생성 API',
    description: '사용자의 식단을 생성한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '식단 생성 완료!', null))
  @ApiFile('photo')
  @Post('')
  createDiet(
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

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: '',
      data: { name: photo.originalname, createDietDto: diet },
    });
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '식단 수정 API',
    description: '사용자의 특정 식단을 수정한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '식단 수정 완료!', null))
  @Put(':id')
  updateDiet(
    @Param('id') id: number,
    @Body() updateDietDto: UpdateDietDto,
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
    summary: '식단 삭제 API',
    description:
      '사용자의 특정 식단을 부드러운 삭제한다. (30일 내로 복원 가능)',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '식단 삭제 완료 완료!', null))
  @Delete(':id')
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
}
