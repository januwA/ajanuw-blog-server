import { IsNotEmpty, IsString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @ApiProperty({ description: '分类标题' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({
    message: 'icon 不能为空',
  })
  @ApiProperty({ description: 'icon图标' })
  readonly icon: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    required: false,
    description: '分类描述',
  })
  readonly description: string;
}
