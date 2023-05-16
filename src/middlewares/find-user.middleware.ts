import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Scope,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user/user.service';
import * as admin from 'firebase-admin';
import { UserEntity } from '../entities/user.entity';

@Injectable({ scope: Scope.DEFAULT })
export class FindUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, uid } = req.user;
    req.dbUser = await this.userService.findUserByUid(uid);

    next();
  }
}
