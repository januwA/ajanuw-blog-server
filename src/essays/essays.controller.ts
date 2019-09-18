import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiUseTags,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EssaysService } from './essays.service';
import { CreateEssayDto } from './dto/create-essay.dto';
import { UpdateEssayDto } from './dto/update-essay.dto';
import { userLoginJwt } from '~auth/jwt-names';
import { RemoveEssayDto } from './dto/patch-sesay.dto';
import { EssayClass } from './classes/essay.class';
import { FindLimitQueryDto } from './dto/find-limit-query.dto';

export const routeName = 'essays';
@ApiUseTags(routeName)
@Controller(routeName)
export class EssaysController {
  constructor(private readonly essaysService: EssaysService) {}

  // 获取所有未删除的essay
  @Get()
  @ApiOkResponse({
    type: [EssayClass],
    description: '返回所有essay',
  })
  async findNotDeleteEssays(@Query() findLimitQueryDto: FindLimitQueryDto) {
    const all = await this.essaysService.findNotDeleteEssays(
      findLimitQueryDto.page,
    );
    return all;
  }

  /// 按标题搜索essays
  @Get('search/:w')
  @ApiOkResponse({
    type: [EssayClass],
    description: '返回搜索到的essay',
  })
  async searchTitle(
    @Param('w') word: string,
    @Query() findLimitQueryDto: FindLimitQueryDto,
  ) {
    const searchResult = await this.essaysService.searchTitle(
      word,
      findLimitQueryDto.page,
    );
    return searchResult;
  }

  // 获取所有假删除的essay
  @Get('deletes')
  @ApiOkResponse({
    type: [EssayClass],
    description: '返回所有被删除的essay',
  })
  async findDeleteEssays(@Query() findLimitQueryDto: FindLimitQueryDto) {
    const all = await this.essaysService.findDeleteEssays(
      findLimitQueryDto.page,
    );
    return all;
  }

  @Get('category/:id')
  @ApiOkResponse({
    type: [EssayClass],
    description: '返回指定类别ID的essay',
  })
  async findCategoryEssays(@Param('id') id: string) {
    return this.essaysService.findCategoryEssays(id);
  }

  // 创建新的文章
  @Post()
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '创建成功',
    type: EssayClass,
  })
  create(@Body() createEssayDto: CreateEssayDto) {
    return this.essaysService.create(createEssayDto);
  }

  // 更新指定文章
  @Put()
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  update(@Body() putEssayDto: UpdateEssayDto) {
    return this.essaysService.update(putEssayDto);
  }

  // 彻底删除指定的essay
  @Delete(':id')
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return await this.essaysService.delete(id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: '返回指定ID的essay',
    type: EssayClass,
  })
  findOne(@Param('id') id: string) {
    return this.essaysService.findOne(id);
  }

  // 假删除/取消假删除
  @Patch(':id')
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  patch(@Param('id') id: string, @Body() removeEssayDto: RemoveEssayDto) {
    return this.essaysService.patch(id, removeEssayDto);
  }
}
