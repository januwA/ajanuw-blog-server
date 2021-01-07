import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('/test')
  test() {
    return {
      data: 'test open api',
    };
  }
}
