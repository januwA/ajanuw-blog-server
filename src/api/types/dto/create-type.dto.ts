import { IsNotEmpty, IsString, IsDefined } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty({
    message: 'icon 不能为空',
  })
  readonly icon: string;

  @IsString()
  @IsDefined()
  readonly description: string;
}
