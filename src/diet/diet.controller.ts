import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
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
import { AwsService } from '../aws/aws.service';
import { DietEntity } from '../entities/diet.entity';

@Controller('diet')
@UseFilters(new ExceptionHandler())
@ApiTags('DIET API')
export class DietController {
  constructor(
    private readonly dietService: DietService,
    private readonly awsService: AwsService,
  ) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '삭제된 식단 조회 API',
    description: '삭제된 지 30일이 넘지 않은 식단 조회',
  })
  @ApiResponse(
    ArrayResponse(HttpStatus.OK, '삭제된 식단 조회 완료!', DietEntity),
  )
  @Get('trash')
  async getSoftDeletedDiets(@Req() req: Request, @Res() res: Response) {
    try {
      const del_diets: DietEntity[] = await this.dietService.getTrashDiets(
        req.dbUser.id,
      );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `${req.dbUser.email}의 삭제된 식단`,
        data: del_diets,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '특정 식단 조회 API',
    description: '사용자의 특정 id에 해당하는 식단을 조회한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 4, 식단 조회 완료!', DietEntity),
  )
  @Get(':id')
  async getOneDiet(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const diet: DietEntity = await this.dietService.getDietById(
        id,
        req.dbUser.id,
      );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 식단 조회 완료`,
        data: diet,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '모든 식단 조회 API',
    description: '사용자의 특정 날짜에 해당하는 모든 식단을 조회한다.',
  })
  @ApiResponse(ArrayResponse(HttpStatus.OK, '5개 식단 조회 완료!', DietEntity))
  @Get('')
  async getAllDietByDate(
    @Query('start') start: string,
    @Query('end') end: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const diets: DietEntity[] = await this.dietService.getDietsByDate();

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '',
        data: diets,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '식단 생성 API',
    description: '사용자의 식단을 생성한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '식단 생성 완료!', DietEntity))
  @ApiFile('photo')
  @Post('')
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
    try {
      const { key, s3Object, contentType, url } =
        await this.awsService.uploadFileToS3('images', photo);

      const result: DietEntity = await this.dietService.createDiet(
        req.dbUser.id,
        createDietDto,
        url,
      );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '',
        data: result,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '식단 수정 API',
    description: '사용자의 특정 식단을 수정한다.',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '식단 수정 완료!', DietEntity))
  @Put(':id')
  async updateDiet(
    @Param('id') id: number,
    @Body() updateDietDto: UpdateDietDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const diet: DietEntity = await this.dietService.updateDietById(
        id,
        req.dbUser.id,
        updateDietDto,
      );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `${id}번 식단 수정 성공`,
        data: diet,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '식단 삭제 API',
    description:
      '사용자의 특정 식단을 부드러운 삭제한다. (30일 내로 복원 가능)',
  })
  @ApiResponse(DataResponse(HttpStatus.OK, '식단 삭제 완료 완료!', DietEntity))
  @Delete(':id')
  async deleteDiet(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const del_diet: DietEntity = await this.dietService.deleteDietById(
        id,
        req.dbUser.id,
      );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `${id}번 식단 삭제 성공`,
        data: del_diet,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
