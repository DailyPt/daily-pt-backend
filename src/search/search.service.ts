import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FoodEntity } from '../entities/food.entity';
import { SupplementEntity } from '../entities/supplement.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(FoodEntity)
    private foodRepository: Repository<FoodEntity>,
    @InjectRepository(SupplementEntity)
    private supplementRepository: Repository<SupplementEntity>,
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

  getSupplementByInput(input: string): Promise<SupplementEntity[]> {
    try {
      return this.supplementRepository.find({
        where: { productName: ILike(`%${input || ''}%`) },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
