import { IsNotEmpty, IsString, IsArray } from 'class-validator';
export class UpdateEssayDto {
  @IsString()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  readonly published: Date;

  @IsArray()
  @IsNotEmpty()
  readonly types: string[];
}
