import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as SUPPLEMENTS from '../resources/datas.json';
import * as FOODS from '../resources/db.json';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplementEntity } from '../entities/supplement.entity';
import { Repository } from 'typeorm';
import { FoodEntity } from '../entities/food.entity';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(SupplementEntity)
    private supplementRepository: Repository<SupplementEntity>,
    @InjectRepository(FoodEntity)
    private foodRepository: Repository<FoodEntity>,
  ) {}

  async insertFoodDatas(): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (let i = 0; i < FOODS.length; i++) {
        const DATA = new FoodEntity();
        const convertToHundred: number = 100 / FOODS[i]['SERVING_SIZE'];

        DATA.foodGroup = FOODS[i]['GROUP_NAME'];
        DATA.descKor = FOODS[i]['DESC_KOR'];
        DATA.makerName = FOODS[i]['MAKER_NAME'];
        DATA.kcal = FOODS[i]['NUTR_CONT1'] * convertToHundred;
        DATA.carbohydrate = FOODS[i]['NUTR_CONT2'] * convertToHundred;
        DATA.protein = FOODS[i]['NUTR_CONT3'] * convertToHundred;
        DATA.fat = FOODS[i]['NUTR_CONT4'] * convertToHundred;
        DATA.sugar = FOODS[i]['NUTR_CONT5'] * convertToHundred;
        DATA.sodium = FOODS[i]['NUTR_CONT6'] * convertToHundred;
        DATA.cholesterol = FOODS[i]['NUTR_CONT7'] * convertToHundred;
        DATA.saturatedFat = FOODS[i]['NUTR_CONT8'] * convertToHundred;
        DATA.transFat = FOODS[i]['NUTR_CONT9'] * convertToHundred;

        await this.foodRepository.save(DATA);
        console.log(`${i}번 째 식단 기록 완료`);
      }
      return '식단 정보 저장 성공!';
    } catch (e) {
      throw new HttpException('데이터베이스 에러', HttpStatus.BAD_REQUEST);
    }
  }

  async insertSupplementDatas(): Promise<string> {
    try {
      let cnt = 1;
      for (let i = 1; i <= 362; i++) {
        const number = i.toString();
        for (let j = 0; j < SUPPLEMENTS[number].length; j++) {
          const item = SUPPLEMENTS[number][j]['item'];
          const DATA = new SupplementEntity();

          DATA.enterprise = item['ENTRPS'];
          DATA.productName = item['PRDUCT'].trim();
          DATA.distbPd = item['DISTB_PD'];
          DATA.feature = item['SUNGSANG'];
          DATA.srvUse = item['SRV_USE'];
          DATA.prsrvPd = item['PRSRV_PD'];
          DATA.intakeHint = item['INTAKE_HINT1'];
          DATA.mainFunc = item['MAIN_FNCTN'];
          DATA.baseStd = item['BASE_STANDARD'];

          await this.supplementRepository.save(DATA);
          cnt++;
          if (cnt % 1000 == 0) console.log(`${cnt}번 완료!`);
        }
      }
      return '영양제 정보 저장 성공!';
    } catch (e) {
      throw new HttpException('데이터베이스 에러', HttpStatus.BAD_REQUEST);
    }
  }
}
