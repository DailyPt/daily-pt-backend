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
export class CreateUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, uid } = req.user;
    req.dbUser = await this.userService.findUserByUid(uid);
    req.isProfileLogged = false;
    if (!req.dbUser) {
      console.log('create user');
      req.dbUser = await this.userService.createUser(email, uid);
    } else if (req.dbUser.profile) {
      req.isProfileLogged = true;
    }

    console.log(`db user: `, req.dbUser);
    console.log(`is new: ${req.isProfileLogged}`);
    next();
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
      dbUser?: UserEntity;
      isProfileLogged?: boolean;
    }
  }
}
