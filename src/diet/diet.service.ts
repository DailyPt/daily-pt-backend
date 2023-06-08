import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DietEntity } from '../entities/diet.entity';
import { AwsService } from '../aws/aws.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { FoodEntity } from '../entities/food.entity';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(DietEntity)
    private dietRepository: Repository<DietEntity>,
    @InjectRepository(FoodEntity)
    private foodRepository: Repository<FoodEntity>,
  ) {}

  async createDiet(
    id: number,
    createDietDto: CreateDietDto,
    photoLink: string,
  ): Promise<DietEntity> {
    try {
      const diet = new DietEntity();

      diet.userId = id;
      diet.food = await this.foodRepository.findOne({
        where: { id: createDietDto.foodId },
      });
      diet.quantity = createDietDto.quantity;
      diet.memo = createDietDto.memo;
      diet.rating = createDietDto.rating;
      diet.photoLink = photoLink;
      diet.date = createDietDto.date;

      return this.dietRepository.save(diet);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
