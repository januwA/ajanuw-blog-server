import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Expose } from 'class-transformer';
export class CreateEssayDto {
  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsArray()
  readonly types: string[];
}
