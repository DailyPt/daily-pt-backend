import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseMiddleware } from '../middlewares/firebase.middleware';
import { CreateUserMiddleware } from '../middlewares/create-user.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    FirebaseService,
    FirebaseMiddleware,
    CreateUserMiddleware,
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware, CreateUserMiddleware).forRoutes({
      path: 'user/token*',
      method: RequestMethod.ALL,
    });

    // consumer.apply(FirebaseMiddleware).forRoutes({
    //   path: 'user/token*',
    //   method: RequestMethod.ALL,
    // });
    //
    // consumer
    //   .apply(FirebaseMiddleware)
    //   .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
