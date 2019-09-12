import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class UpdateEssayDto {
  @IsString()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  @ApiModelProperty({
    description: 'essay id',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({})
  readonly content: string;

  @ApiModelProperty({
    required: false,
  })
  readonly published: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiModelProperty({
    example: [1, 2],
    type: [String],
  })
  readonly types: string[];
}
