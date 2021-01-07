import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateEssayDto {
  @IsString()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  @ApiProperty({
    description: 'essay id',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  readonly content: string;

  @ApiProperty({
    required: false,
  })
  readonly published: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    example: [1, 2],
    type: [String],
  })
  readonly types: string[];
}
