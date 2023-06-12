import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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
import { ArrayResponse, DataResponse } from '../utils/swagger';
import { Request, Response } from 'express';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';
import { DietEntity } from '../entities/diet.entity';
import { NutrientEntity } from '../entities/nutrient.entity';

@Controller('nutrient')
@UseFilters(new ExceptionHandler())
@ApiTags('NUTRIENT API')
export class NutrientController {
  constructor(private readonly nutrientService: NutrientService) {}

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '삭제된 영양제 조회 API',
    description: '삭제된 지 30일이 넘지 않은 영양제 조회',
  })
  @ApiResponse(
    ArrayResponse(HttpStatus.OK, '삭제된 영양제 조회 완료!', NutrientEntity),
  )
  @Get('trash')
  async getSoftDeletedNutrients(@Req() req: Request, @Res() res: Response) {
    try {
      const del_nutrients: NutrientEntity[] =
        await this.nutrientService.getTrashNutrient(req.dbUser.id);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `삭제된 영양제 조회 완료!`,
        data: del_nutrients,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '특정 영양제 조회 API',
    description: '사용자의 특정 id에 해당하는 영양제를 조회한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 4, 영양제 조회 완료!', NutrientEntity),
  )
  @Get(':id')
  async getOneNutrient(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const nutrient: NutrientEntity =
        await this.nutrientService.getNutrientById(id, req.dbUser.id);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 영양제 조회 완료`,
        data: nutrient,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '모든 영양제 조회 API',
    description: '사용자의 모든 영양제를 조회한다.',
  })
  @ApiResponse(
    ArrayResponse(
      HttpStatus.OK,
      'test@test.com님의 영양제 조회 완료!',
      NutrientEntity,
    ),
  )
  @Get('')
  async getAllNutrients(@Req() req: Request, @Res() res: Response) {
    try {
      const nutrients: NutrientEntity[] =
        await this.nutrientService.getAllNutrients(req.dbUser.id);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `${req.dbUser.email}님의 영양제 조회 완료!`,
        data: nutrients,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '영양제 생성 API',
    description: '사용자의 영양제를 생성한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, '영양제 기록 생성 완료!', NutrientEntity),
  )
  @Post('')
  async createNutrient(
    @Body() createNutrientDto: CreateNutrientDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const nutrient: NutrientEntity =
        await this.nutrientService.createNutrient(
          req.dbUser.id,
          createNutrientDto,
        );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `영양제 기록 생성 완료!`,
        data: nutrient,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '영양제 수정 API',
    description: '사용자의 특정 영양제를 수정한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 3, 영양제 수정 완료!', NutrientEntity),
  )
  @Put(':id')
  async updateNutrient(
    @Param('id') id: number,
    @Body() updateNutrientDto: UpdateNutrientDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const nutrient: NutrientEntity =
      await this.nutrientService.updateNutrientById(
        id,
        req.dbUser.id,
        updateNutrientDto,
      );

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 영양제 수정 완료`,
        data: nutrient,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '영양제 삭제 API',
    description:
      '사용자의 특정 영양제를 부드러운 삭제한다. (30일 내로 복원 가능)',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id: 3, 영양제 삭제 완료!', NutrientEntity),
  )
  @Delete(':id')
  async deleteNutrient(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const del_nutrient: NutrientEntity =
      await this.nutrientService.deleteNutrientById(id, req.dbUser.id);

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 영양제 삭제 완료`,
        data: del_nutrient,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '영양제 복원 API',
    description: '삭제된 특정 영양제를 복원한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 4, 영양제 복원 완료!', NutrientEntity),
  )
  @Get('restore/:id')
  async restoreNutrient(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const nutrient: NutrientEntity =
      await this.nutrientService.restoreNutrientById(id, req.dbUser.id);

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 영양제 복원 완료!`,
        data: nutrient,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
