import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from '../entities/food.entity';
import { SupplementEntity } from '../entities/supplement.entity';
import { AwsService } from '../aws/aws.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity, SupplementEntity])],
  controllers: [SearchController],
  providers: [SearchService, AwsService],
})
export class SearchModule {}
