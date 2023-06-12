import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFile(fieldName: string, localOptions?: MulterOptions) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: [fieldName, 'foodId', 'quantity', 'memo', 'rating', 'date'],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
          foodId: {
            type: 'string',
            default: '123',
          },
          quantity: {
            type: 'string',
            default: '3',
          },
          memo: {
            type: 'string',
            default: '김재한 개 빡대가리',
          },
          rating: {
            type: 'string',
            default: '5',
          },
          date: {
            type: 'string',
            default: '2023-06-11T20:30:00.000Z',
          },
        },
      },
    }),
  );
}
