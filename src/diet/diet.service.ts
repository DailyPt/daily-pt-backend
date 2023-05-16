import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DietEntity } from '../entities/diet.entity';
import { FoodEntity } from '../entities/food.entity';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(DietEntity)
    private dietRepository: Repository<DietEntity>,
    @InjectRepository(FoodEntity)
    private foodRepository: Repository<FoodEntity>,
  ) {}

  getFoodByInput(input: string): Promise<FoodEntity[]> {
    try {
      return this.foodRepository.find({
        where: { descKor: ILike(`%${input || ''}%`) },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
