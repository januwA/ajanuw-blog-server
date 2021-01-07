import { ApiProperty } from '@nestjs/swagger';
import { TypeClass } from '~api/types/classes/type.class';

export class EssayClass {
  @ApiProperty({
    type: String,
    example: '5d56b4a70e593e119476a2b8',
  })
  id: String;

  @ApiProperty({
    type: [String],
    example: ['5d56b4350e593e119476a2b4'],
  })
  readonly types: String[];

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  readonly isDelete: Boolean;

  @ApiProperty({
    type: String,
    example: 'js学习笔记',
  })
  readonly title: '';

  @ApiProperty({
    example: 'asdasdasdasdasdasda',
  })
  readonly content: string;

  @ApiProperty({
    type: String,
    example: 'SourceForge下载工具',
  })
  readonly summary: String;

  @ApiProperty({
    type: String,
    example: '2019-08-16T13:50:31.307Z',
  })
  published: string;

  @ApiProperty({
    isArray: true,
    type: TypeClass,
  })
  readonly ts: TypeClass[];
}
