import { Controller, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('/test')
  test() {
    return {
      msg: 'hello',
    };
  }
}
