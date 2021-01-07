import {
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';
import { PutTypeDto } from './dto/put-type.dto';
import {
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TypeClass } from './classes/type.class';
import { Type } from './schemas/type.schema';
import { JwtAuthGuard } from '~api/auth/jwt-auth.guard';

export const routeName = 'api/types';
@ApiTags(routeName)
@Controller(routeName)
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  @ApiOkResponse({
    description: '返回所有类型',
    isArray: true,
    type: TypeClass,
  })
  getAll() {
    return this.typesService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '创建新的类型成功.',
  })
  create(@Body() createType: CreateTypeDto): Promise<Type> {
    return this.typesService.create(createType);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '修改成功',
  })
  put(@Body() putTypeDto: PutTypeDto) {
    return this.typesService.put(putTypeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '删除成功',
  })
  delete(@Param('id') id: string) {
    return this.typesService.delete(id);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '获取指定id的类型',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: '返回查询到的类型',
    type: TypeClass,
  })
  getOne(@Param('id') typeId: string): Promise<Type> {
    return this.typesService.getOne(typeId);
  }
}
