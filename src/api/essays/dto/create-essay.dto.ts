import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEssayDto {
  @IsString()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @ApiProperty({
    required: true,
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly content: string;

  @Expose()
  get summary(): string {
    const contentLength = this.content.length;
    return this.content.slice(0, Math.min(30, contentLength));
  }

  @IsArray()
  @ApiProperty({
    required: true,
    description: 'type的id',
    type: [String],
    example: ['5d56b4350e593e119476a2b4'],
  })
  readonly types: string[];
}
