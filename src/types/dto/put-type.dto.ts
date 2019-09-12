import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class PutTypeDto {
  @IsString()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  @ApiModelProperty({
    description: '分类id',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @ApiModelProperty({
    description: '新分类标题',
  })
  readonly title: string;

  @IsString()
  @ApiModelProperty({
    required: false,
    description: '新分类描述',
  })
  readonly description: string;
}
