import { IsNotEmpty, IsString, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @ApiModelProperty({ description: '分类标题' })
  readonly title: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty({
    required: false,
    description: '分类描述',
  })
  readonly description: string;
}
