import {
  IsNotEmpty,
  IsString,
  Contains,
  IsArray,
  ValidateNested,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class RemoveEssayItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    example: 'replace',
  })
  op: string;

  @IsString()
  @IsNotEmpty()
  @Contains('/')
  @ApiModelProperty({
    example: '/isDelete',
  })
  path: string;

  @IsDefined()
  @ApiModelProperty({
    required: false,
    example: false,
  })
  readonly value: any;
}

export class RemoveEssayDto {
  @IsNotEmpty()
  @IsArray()
  @ApiModelProperty({
    isArray: true,
    type: RemoveEssayItemDto,
  })
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => RemoveEssayItemDto)
  readonly patchs: RemoveEssayItemDto[];
}

export function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.reduce(
              (acc, el) => acc && typeof el === 'object' && !Array.isArray(el),
              true,
            )
          );
        },
      },
    });
  };
}
