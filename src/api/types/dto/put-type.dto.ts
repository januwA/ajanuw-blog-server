import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PutTypeDto {
  @IsString()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  @ApiProperty({
    description: '分类id',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @ApiProperty({
    description: '新分类标题',
  })
  readonly title: string;


  @IsString()
  @IsNotEmpty({
    message: 'icon不能为空',
  })
  @ApiProperty({
    description: 'icon图标',
  })
  readonly icon: string;

  @IsString()
  @ApiProperty({
    required: false,
    description: '新分类描述',
  })
  readonly description: string;
}
