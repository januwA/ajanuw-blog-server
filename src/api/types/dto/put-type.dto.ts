import { IsNotEmpty, IsString } from 'class-validator';
export class PutTypeDto {
  @IsString()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty({
    message: 'icon不能为空',
  })
  readonly icon: string;

  @IsString()
  readonly description: string;
}
