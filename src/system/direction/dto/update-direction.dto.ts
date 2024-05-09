import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectionDto } from './create-direction.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDirectionDto extends PartialType(CreateDirectionDto) {
  @IsNotEmpty({ message: '岗位ID不能为空。' })
  directionCode: number;

  @IsNotEmpty({ message: '岗位名称不能为空。' })
  directionName: string;
}
