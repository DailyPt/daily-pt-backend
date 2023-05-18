import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietEntity } from '../entities/diet.entity';
import { UserEntity } from '../entities/user.entity';
import { IngredientEntity } from '../entities/ingredient.entity';
import { FoodEntity } from '../entities/food.entity';
import { FirebaseMiddleware } from '../middlewares/firebase.middleware';
import { CreateUserMiddleware } from '../middlewares/create-user.middleware';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { ProfileEntity } from '../entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DietEntity,
      IngredientEntity,
      FoodEntity,
      ProfileEntity,
    ]),
  ],
  controllers: [DietController],
  providers: [
    DietService,
    FirebaseMiddleware,
    CreateUserMiddleware,
    FirebaseService,
    FirebaseMiddleware,
    UserService,
  ],
})
export class DietModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware, CreateUserMiddleware).forRoutes({
      path: 'diet/*',
      method: RequestMethod.ALL,
    });
  }
}
