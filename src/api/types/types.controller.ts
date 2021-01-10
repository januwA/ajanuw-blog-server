import {
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';
import { PutTypeDto } from './dto/put-type.dto';
import { Type } from './schemas/type.schema';
import { JwtAuthGuard } from '~api/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharedService } from 'src/shared/shared.service';

@Controller('api/types')
export class TypesController {
  constructor(
    private readonly typesService: TypesService,
    private readonly sharedService: SharedService,
  ) {}

  @Get()
  getAll() {
    return this.typesService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createType: CreateTypeDto): Promise<Type> {
    return this.typesService.create(createType);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  put(@Body() putTypeDto: PutTypeDto) {
    return this.typesService.put(putTypeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.typesService.delete(id);
  }

  @Get(':id')
  getOne(@Param('id') typeId: string): Promise<Type> {
    return this.typesService.getOne(typeId);
  }

  /**
   * 上传类型的icon
   * @param file
   */
  @Post('icon')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadIcon(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    return { url: await this.sharedService.qiniu(file) };
  }
}
