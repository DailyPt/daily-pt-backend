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
import { ArrayResponse, DataResponse } from '../utils/swagger';
import { Request, Response } from 'express';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';
import { DietEntity } from '../entities/diet.entity';
import { NutrientEntity } from '../entities/nutrient.entity';
import { AlarmEntity } from '../entities/alarm.entity';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordEntity } from '../entities/record.entity';
import { GetRecordQuery } from './dto/record-query.dto';

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

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '특정 알람 조회 API',
    description: '알람 id를 통해 알람을 조회한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 4, 알람 조회 완료!', AlarmEntity),
  )
  @Get('alarm/:id')
  async getAlarm(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const alarm: AlarmEntity = await this.nutrientService.getOneAlarmById(
      req.dbUser.id,
      id,
    );

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 알람 조회 완료!`,
        data: alarm,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '영양제의 알람 조회 API',
    description: '영양제 id를 통해 알람을 조회 한다.',
  })
  @ApiResponse(
    ArrayResponse(
      HttpStatus.OK,
      'test@test.com님의 알람 조회 완료!',
      AlarmEntity,
    ),
  )
  @Get('alarm/all/:nutrientId')
  async getAllAlarmsByNutrientId(
    @Param('nutrientId') nutrientId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const alarm: AlarmEntity[] = await this.nutrientService.getAllAlarms(
      req.dbUser.id,
      nutrientId,
    );

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `${req.dbUser.email}님의 알람 조회 완료!`,
        data: alarm,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '특정 알람 수정 API',
    description: '알람 id를 통해 알람을 수정한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 4, 알람 수정 완료!', AlarmEntity),
  )
  @Put('alarm/:id')
  async updateAlarm(
    @Param('id') id: number,
    @Body() updateAlarmDto: UpdateAlarmDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const alarm: AlarmEntity = await this.nutrientService.updateAlarm(
      req.dbUser.id,
      id,
      updateAlarmDto,
    );

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 알람 수정 완료!`,
        data: alarm,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '특정 알람 삭제 API',
    description: '알람 id를 통해 알람을 삭제한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 4, 알람 삭제 완료!', AlarmEntity),
  )
  @Delete('alarm/:id')
  async deleteAlarm(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const alarm: AlarmEntity = await this.nutrientService.deleteAlarm(
      req.dbUser.id,
      id,
    );

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `id : ${id}, 알람 삭제 완료!`,
        data: alarm,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '영양제 기록 생성 API',
    description: '영양제 id를 통해 기록을 생성한다.',
  })
  @ApiResponse(
    DataResponse(HttpStatus.OK, 'id : 4, 영양제 기록 생성 완료!', RecordEntity),
  )
  @Post('record/:nutrientId')
  async createRecord(
    @Param('nutrientId') nutrientId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const record: RecordEntity = await this.nutrientService.createRecord(
      req.dbUser.id,
      nutrientId,
    );

    try {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `nutrientId : ${nutrientId}, 영양제 기록 생성 완료!`,
        data: record,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @ApiBearerAuth('firebase_token')
  @ApiOperation({
    summary: '오늘 영양제 기록 조회 API',
    description: '사용자 id를 통해 오늘의 영양제 기록을 조회한다.',
  })
  @ApiResponse(
    ArrayResponse(
      HttpStatus.OK,
      'test@test.com님의 영양제 기록 조회 완료!',
      RecordEntity,
    ),
  )
  @Get('record/date')
  async getRecordsByDate(
    @Query() queryParams: GetRecordQuery,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const records: RecordEntity[] = await this.nutrientService.getAllRecords(
        req.dbUser.id,
        queryParams.date ? queryParams.date : new Date().toString(),
      );

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: `${req.dbUser.email}님, 영양제 기록 조회 완료!`,
        data: records,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
