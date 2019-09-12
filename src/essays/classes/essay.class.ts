import { ApiModelProperty } from '@nestjs/swagger';
import { TypeClass } from '~src/types/classes/type.class';

export class EssayClass {
  @ApiModelProperty({
    example: '5d56b4a70e593e119476a2b8',
  })
  id: String;

  @ApiModelProperty({
    type: [String],
    example: ['5d56b4350e593e119476a2b4'],
  })
  types: String[];

  @ApiModelProperty({
    type: Boolean,
    example: false,
  })
  isDelete: Boolean;

  @ApiModelProperty({
    type: String,
    example: 'js学习笔记',
  })
  title: '';

  @ApiModelProperty({
    example: 'asdasdasdasdasdasda',
  })
  content: string;

  @ApiModelProperty({
    type: String,
    example: 'SourceForge下载工具',
  })
  readonly summary: String;

  @ApiModelProperty({
    type: String,
    example: '2019-08-16T13:50:31.307Z',
  })
  published: string;

  @ApiModelProperty({
    isArray: true,
    type: TypeClass,
  })
  readonly ts: TypeClass[];
}
