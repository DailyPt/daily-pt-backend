import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbController } from './db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from '../entities/food.entity';
import { SupplementEntity } from '../entities/supplement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity, SupplementEntity])],
  providers: [DbService],
  controllers: [DbController],
})
export class DbModule {}
