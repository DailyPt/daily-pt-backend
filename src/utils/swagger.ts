import { INestApplication, Type } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { boolean } from 'joi';
import { SupplementEntity } from '../entities/supplement.entity';
import { UserEntity } from '../entities/user.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { ResponseLoginDto } from '../user/dto/response-login.dto';
import { ProfileDto } from '../user/dto/profile.dto';
import { FoodEntity } from '../entities/food.entity';
import { DietEntity } from '../entities/diet.entity';
import { NutrientEntity } from '../entities/nutrient.entity';
import { RecordEntity } from '../entities/record.entity';
import { AlarmEntity } from '../entities/alarm.entity';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Daily PT API')
    .setDescription('Daily PT Today!')
    .setVersion('1.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        in: 'headers',
      },
      'firebase_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [
      UserEntity,
      ProfileEntity,
      SupplementEntity,
      FoodEntity,
      ResponseLoginDto,
      ProfileDto,
      DietEntity,
      NutrientEntity,
      RecordEntity,
      AlarmEntity,
      boolean,
    ],
  });
  SwaggerModule.setup('api-docs', app, document);
}

export function ArrayResponse(
  status: number,
  message: string,
  T: Type,
): ApiResponseOptions {
  return {
    status,
    isArray: true,
    description: 'Successful response',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', default: status },
        message: { type: 'string', default: message },
        data: {
          type: 'array',
          items: {
            anyOf: [{ $ref: getSchemaPath(T) }],
          },
        },
      },
    },
  };
}

export function DataResponse(
  status: number,
  message: string,
  T: Type,
): ApiResponseOptions {
  return {
    status,
    description: 'Successful response',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', default: status },
        message: { type: 'string', default: message },
        data: {
          $ref: getSchemaPath(T),
        },
      },
    },
  };
}
