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
import { Type } from './interfaces/type.interface';
import { PutTypeDto } from './dto/put-type.dto';
import {
  ApiImplicitParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { userLoginJwt } from '~auth/jwt-names';
import { TypeClass } from './classes/type.class';

export const routeName = 'types';
@ApiUseTags(routeName)
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
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '创建新的类型成功.',
  })
  create(@Body() createType: CreateTypeDto): Promise<Type> {
    return this.typesService.create(createType);
  }

  @Put()
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '修改成功',
  })
  put(@Body() putTypeDto: PutTypeDto) {
    return this.typesService.put(putTypeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '删除成功',
  })
  delete(@Param('id') id: string) {
    return this.typesService.delete(id);
  }

  @Get(':id')
  @ApiImplicitParam({
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
