import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {
  @IsNotEmpty({ message: '物资ID不能为空。' })
  resourceID: string;

  resourceTypeID?: string;

  resourceName?: string;

  /**
   * 0: 在库
   * 1: 离库
   */
  status?: number;
}
