import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExceptionHandler } from './utils/ExceptionHandler';

@Controller()
@UseFilters(new ExceptionHandler())
@ApiTags('APP API')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'HEALTH CHECK API',
    description: '어플리케이션의 상태를 확인한다.',
  })
  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
