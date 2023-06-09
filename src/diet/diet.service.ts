import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { DietEntity } from '../entities/diet.entity';
import { CreateDietDto } from './dto/create-diet.dto';
import { FoodEntity } from '../entities/food.entity';
import { UpdateDietDto } from './dto/update-diet.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as process from 'process';
import * as FormData from 'form-data';
import { foodNuberList } from './constant/food.number';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(DietEntity)
    private dietRepository: Repository<DietEntity>,
    @InjectRepository(FoodEntity)
    private foodRepository: Repository<FoodEntity>,
    private readonly httpService: HttpService,
  ) {}

  async getDietById(id: number, userId: number): Promise<DietEntity> {
    try {
      const result: DietEntity = await this.dietRepository.findOne({
        where: { id, userId, isDeleted: false },
        relations: ['food'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 식단이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getDietsByDate(
    start: Date,
    end: Date,
    userId: number,
  ): Promise<DietEntity[]> {
    try {
      const result: DietEntity[] = await this.dietRepository.find({
        where: { userId, isDeleted: false, date: Between(start, end) },
        relations: ['food'],
      });
      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getTrashDiets(userId: number): Promise<DietEntity[]> {
    try {
      const result: DietEntity[] = await this.dietRepository.find({
        where: { userId, isDeleted: true },
        relations: ['food'],
      });
      if (!result) {
        throw new HttpException(
          `삭제된 식단이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async updateDietById(
    id: number,
    userId: number,
    diet: UpdateDietDto,
  ): Promise<DietEntity> {
    try {
      const result: DietEntity = await this.dietRepository.findOne({
        where: { id, userId, isDeleted: false },
        relations: ['food'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 식단이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.quantity = diet.quantity;
      result.memo = diet.memo;
      result.rating = diet.rating;
      result.date = new Date(diet.date);

      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async deleteDietById(id: number, userId: number): Promise<DietEntity> {
    try {
      const result: DietEntity = await this.dietRepository.findOne({
        where: { id, userId, isDeleted: false },
        relations: ['food'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 식단이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.isDeleted = true;
      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async restoreDietById(id: number, userId: number): Promise<DietEntity> {
    try {
      const result: DietEntity = await this.dietRepository.findOne({
        where: { id, userId, isDeleted: true },
        relations: ['food'],
      });
      if (!result) {
        throw new HttpException(
          `id : ${id}, 해당하는 식단이 없습니다.`,
          HttpStatus.NO_CONTENT,
        );
      }

      result.isDeleted = false;
      return await result.save();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async createDiet(
    id: number,
    createDietDto: CreateDietDto,
    photoLink: string,
  ): Promise<DietEntity> {
    try {
      const diet: DietEntity = new DietEntity();

      diet.userId = id;
      diet.food = await this.foodRepository.findOne({
        where: { id: createDietDto.foodId },
      });
      diet.quantity = createDietDto.quantity;
      diet.memo = createDietDto.memo;
      diet.rating = createDietDto.rating;
      diet.photoLink = photoLink;
      diet.date = new Date(createDietDto.date);

      return await this.dietRepository.save(diet);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async recognizePhoto(photo: Express.Multer.File): Promise<number[]> {
    try {
      const formData: FormData = new FormData();

      formData.append('file', Buffer.from(photo.buffer), {
        filename: photo.originalname,
      });

      const { data } = await firstValueFrom(
        this.httpService
          .post<any[]>(`${process.env.AI_SERVER_URL}/photo`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new HttpException(
                error.response.data,
                error.response.status,
              );
            }),
          ),
      );
      return data;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getFoodListByRecognization(foodList: number[]) {
    try {
      const result = [];
      for (const foodNumber of foodList) {
        result.push(
          await this.foodRepository.findOne({
            where: { id: foodNuberList[foodNumber] },
          }),
        );
      }

      return result;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
