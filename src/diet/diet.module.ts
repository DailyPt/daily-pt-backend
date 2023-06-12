import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietEntity } from '../entities/diet.entity';
import { UserEntity } from '../entities/user.entity';
import { FoodEntity } from '../entities/food.entity';
import { FirebaseMiddleware } from '../middlewares/firebase.middleware';
import { CreateUserMiddleware } from '../middlewares/create-user.middleware';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { ProfileEntity } from '../entities/profile.entity';
import { AwsService } from '../aws/aws.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      DietEntity,
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
    AwsService,
  ],
})
export class DietModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware, CreateUserMiddleware).forRoutes({
      path: 'diet*',
      method: RequestMethod.ALL,
    });
  }
}
