import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DietEntity } from '../entities/diet.entity';
import { Repository } from 'typeorm';
import { NutrientEntity } from '../entities/nutrient.entity';
import { SupplementEntity } from '../entities/supplement.entity';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';
import { CreateNutrientDto } from './dto/create-nutrient.dto';

@Injectable()
export class NutrientService {
  constructor(
    @InjectRepository(NutrientEntity)
    private nutrientRepository: Repository<NutrientEntity>,
    @InjectRepository(SupplementEntity)
    private supplementRepository: Repository<SupplementEntity>,
  ) {}

  async getNutrientById(id: number, userId: number): Promise<NutrientEntity> {
    try {
      const result: NutrientEntity = await this.nutrientRepository.findOne({
        where: { id, userId, isDeleted: false },
        relations: ['supplement'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}에 해당하는 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
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
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
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
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
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
          `id : ${id}에 해당하는 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.quantity = nutrient.quantity;

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
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
          `id : ${id}에 해당하는 영양제가 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.isDeleted = true;

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
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

      return await nutrient.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
