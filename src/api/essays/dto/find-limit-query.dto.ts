import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindLimitQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1, {
    message: '页面不得少于1',
  }) // 大于或等于1
  @ApiProperty({
    example: 1,
    type: Number,
    description: '分页默认从第一页开始，每页返回20条数据',
  })
  readonly page: number;
}
