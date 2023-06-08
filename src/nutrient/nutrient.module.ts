import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { NutrientController } from './nutrient.controller';
import { NutrientService } from './nutrient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DietEntity } from '../entities/diet.entity';
import { FoodEntity } from '../entities/food.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { NutrientEntity } from '../entities/nutrient.entity';
import { SupplementEntity } from '../entities/supplement.entity';
import { FirebaseMiddleware } from '../middlewares/firebase.middleware';
import { CreateUserMiddleware } from '../middlewares/create-user.middleware';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { AlarmEntity } from '../entities/alarm.entity';
import { RecordEntity } from '../entities/record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NutrientEntity,
      SupplementEntity,
      UserEntity,
      DietEntity,
      FoodEntity,
      ProfileEntity,
      AlarmEntity,
      RecordEntity,
    ]),
  ],
  controllers: [NutrientController],
  providers: [
    NutrientService,
    FirebaseMiddleware,
    CreateUserMiddleware,
    FirebaseService,
    FirebaseMiddleware,
    UserService,
  ],
})
export class NutrientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware, CreateUserMiddleware).forRoutes({
      path: 'nutrient*',
      method: RequestMethod.ALL,
    });
  }
}
