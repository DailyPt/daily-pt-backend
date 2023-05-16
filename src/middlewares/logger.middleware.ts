import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: () => void) {
    const { method, url } = request;

    const start = new Date();
    response.on('finish', () => {
      const { statusCode } = response;
      const ms = Date.now() - start.getTime();
      console.log(
        `=> ${method} ${url} - ${statusCode} ${response.statusMessage} ${ms}ms`,
      );
    });
    next();
  }
}
