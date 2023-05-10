import { Module } from '@nestjs/common';
import { NutrientController } from './nutrient.controller';
import { NutrientService } from './nutrient.service';

@Module({
  controllers: [NutrientController],
  providers: [NutrientService],
})
export class NutrientModule {}
