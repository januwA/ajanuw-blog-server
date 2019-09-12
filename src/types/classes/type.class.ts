import { ApiModelProperty } from '@nestjs/swagger';

export class TypeClass {
  @ApiModelProperty({
    example: '5d3ae5d3bb00741b443a9381',
  })
  id: string;

  @ApiModelProperty({
    example: '标题',
  })
  title: string;

  @ApiModelProperty({
    example: '介绍',
  })
  description: string;

  @ApiModelProperty({
    example: 0,
    description: '统计',
  })
  len: number;
}
