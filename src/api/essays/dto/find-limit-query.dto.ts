import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindLimitQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1, {
    message: '页面不得少于1',
  }) // 大于或等于1
  readonly page: number;
}
