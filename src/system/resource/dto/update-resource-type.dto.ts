import { IsNotEmpty } from 'class-validator';
import { CreateResourceTypeDto } from './create-resource-type.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateResourceTypeDto extends PartialType(CreateResourceTypeDto) {
  @IsNotEmpty({ message: '物资类型ID不能为空。' })
  resourceTypeID: string;

  @IsNotEmpty({ message: '物资类型名称不能为空。' })
  resourceTypeName: string;
}
