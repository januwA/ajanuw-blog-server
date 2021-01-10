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
import { EssaysService } from './essays.service';
import { CreateEssayDto } from './dto/create-essay.dto';
import { UpdateEssayDto } from './dto/update-essay.dto';
import { RemoveEssayDto } from './dto/patch-sesay.dto';
import { FindLimitQueryDto } from './dto/find-limit-query.dto';
import { JwtAuthGuard } from '~api/auth/jwt-auth.guard';

@Controller('api/essays')
export class EssaysController {
  constructor(private readonly essaysService: EssaysService) {}

  // 获取所有未删除的essay
  @Get()
  async findNotDeleteEssays(@Query() findLimitQueryDto: FindLimitQueryDto) {
    const all = await this.essaysService.findNotDeleteEssays(
      findLimitQueryDto.page,
    );
    return all;
  }

  /// 按标题搜索essays
  @Get('search/:w')
  async searchTitle(
    @Param('w') word: string,
    @Query() findLimitQueryDto: FindLimitQueryDto,
  ) {
    return this.essaysService.searchTitle(word, findLimitQueryDto.page);
  }

  // 获取所有假删除的essay
  @Get('deletes')
  async findDeleteEssays(@Query() findLimitQueryDto: FindLimitQueryDto) {
    return this.essaysService.findDeleteEssays(findLimitQueryDto.page);
  }

  /**
   * 查询包含指定type的essays
   * @param id 
   */
  @Get('category/:id')
  async findCategoryEssays(@Param('id') id: string) {
    return this.essaysService.findCategoryEssays(id);
  }

  // 创建新的文章
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEssayDto: CreateEssayDto) {
    return this.essaysService.create(createEssayDto);
  }

  // 更新指定文章
  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() putEssayDto: UpdateEssayDto) {
    return this.essaysService.update(putEssayDto);
  }

  // 彻底删除指定的essay
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.essaysService.delete(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.essaysService.findOne(id);
  }

  // 假删除/取消假删除
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  patch(@Param('id') id: string, @Body() removeEssayDto: RemoveEssayDto) {
    return this.essaysService.patch(id, removeEssayDto);
  }
}
