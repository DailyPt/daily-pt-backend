import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DietEntity } from '../entities/diet.entity';
import { Repository } from 'typeorm';
import { NutrientEntity } from '../entities/nutrient.entity';
import { SupplementEntity } from '../entities/supplement.entity';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { AlarmEntity } from '../entities/alarm.entity';
import { RecordEntity } from '../entities/record.entity';
import { daysEnum } from './constant/day.enum';
import { UpdateAlarmDto } from './dto/update-alarm.dto';

@Injectable()
export class NutrientService {
  constructor(
    @InjectRepository(NutrientEntity)
    private nutrientRepository: Repository<NutrientEntity>,
    @InjectRepository(SupplementEntity)
    private supplementRepository: Repository<SupplementEntity>,
    @InjectRepository(AlarmEntity)
    private alarmRepository: Repository<AlarmEntity>,
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>,
  ) {}

  async getNutrientById(id: number, userId: number): Promise<NutrientEntity> {
    try {
      const result: NutrientEntity = await this.nutrientRepository.findOne({
        where: { id, userId, isDeleted: false },
        relations: ['supplement'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getAllNutrients(userId: number): Promise<NutrientEntity[]> {
    try {
      const result: NutrientEntity[] = await this.nutrientRepository.find({
        where: { userId, isDeleted: false },
        relations: ['supplement'],
      });
      if (!result) {
        throw new HttpException(`영양제가 없습니다.`, HttpStatus.NO_CONTENT);
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getTrashNutrient(userId: number): Promise<NutrientEntity[]> {
    try {
      const result: NutrientEntity[] = await this.nutrientRepository.find({
        where: { userId, isDeleted: true },
        relations: ['supplement'],
      });
      if (!result) {
        throw new HttpException(
          `삭제된 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async updateNutrientById(
    id: number,
    userId: number,
    nutrient: UpdateNutrientDto,
  ): Promise<NutrientEntity> {
    try {
      const result: NutrientEntity = await this.nutrientRepository.findOne({
        where: { id, userId, isDeleted: false },
        relations: ['supplement'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.quantity = nutrient.quantity;

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async deleteNutrientById(
    id: number,
    userId: number,
  ): Promise<NutrientEntity> {
    try {
      const result: NutrientEntity = await this.nutrientRepository.findOne({
        where: { id, userId, isDeleted: false },
        relations: ['supplement'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.isDeleted = true;

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async restoreNutrientById(
    id: number,
    userId: number,
  ): Promise<NutrientEntity> {
    try {
      const result: NutrientEntity = await this.nutrientRepository.findOne({
        where: { id, userId, isDeleted: true },
        relations: ['supplement'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.isDeleted = false;

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async createNutrient(
    userId: number,
    createNutrientDto: CreateNutrientDto,
  ): Promise<NutrientEntity> {
    try {
      const nutrient: NutrientEntity = new NutrientEntity();

      nutrient.supplement = await this.supplementRepository.findOne({
        where: { id: createNutrientDto.supplementId },
      });
      if (!nutrient.supplement) {
        throw new HttpException(
          `id : ${createNutrientDto.supplementId}에 해당하는 영양제 가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      nutrient.userId = userId;
      nutrient.quantity = createNutrientDto.quantity;

      for (const time of createNutrientDto.times) {
        const alarm: AlarmEntity = new AlarmEntity();
        for (const day of createNutrientDto.days) {
          alarm[daysEnum[day]] = true;
        }
        alarm.time = time;
        await alarm.save();
      }

      return await nutrient.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getOneAlarmById(userId: number, id: number): Promise<AlarmEntity> {
    try {
      const result: AlarmEntity = await this.alarmRepository.findOne({
        where: { id, userId, isDeleted: false },
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 알람이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getAllAlarms(
    userId: number,
    nutrientId: number,
  ): Promise<AlarmEntity[]> {
    try {
      const result: AlarmEntity[] = await this.alarmRepository.find({
        where: { userId, nutrientId, isDeleted: false },
      });
      if (!result) {
        throw new HttpException(
          `nutrientId : ${nutrientId}, 해당하는 알람이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async updateAlarm(
    userId: number,
    id: number,
    updateAlarmDto: UpdateAlarmDto,
  ): Promise<AlarmEntity> {
    try {
      const result: AlarmEntity = await this.alarmRepository.findOne({
        where: { id, userId, isDeleted: false },
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 알람이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      for (const day of [0, 1, 2, 3, 4, 5, 6]) result[daysEnum[day]] = false;
      for (const day of updateAlarmDto.days) result[daysEnum[day]] = true;
      result.time = updateAlarmDto.time;

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async deleteAlarm(userId: number, id: number): Promise<AlarmEntity> {
    try {
      const result: AlarmEntity = await this.alarmRepository.findOne({
        where: { id, userId, isDeleted: false },
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 알람이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.isDeleted = true;

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
