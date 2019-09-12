import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ example: 'ajanuw', description: '账号' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    example: '123456',
    description: '密码',
  })
  readonly password: string;
}
