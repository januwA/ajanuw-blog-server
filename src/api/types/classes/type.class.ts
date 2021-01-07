import { ApiProperty } from '@nestjs/swagger';

export class TypeClass {
  @ApiProperty({
    example: '5d3ae5d3bb00741b443a9381',
  })
  id: string;

  @ApiProperty({
    example: '标题',
  })
  title: string;


  @ApiProperty({
    example: 'https://i.loli.net/2019/09/18/6BchR5Ij1DpSOQd.png',
  })
  icon: string;

  @ApiProperty({
    example: '介绍',
  })
  description: string;

  @ApiProperty({
    example: 0,
    description: '统计',
  })
  len: number;
}
