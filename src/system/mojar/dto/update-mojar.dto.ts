import { PartialType } from '@nestjs/mapped-types';
import { CreateMojarDto } from './create-mojar.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMojarDto extends PartialType(CreateMojarDto) {
  @IsNotEmpty({ message: '专业ID不能为空。' })
  mojarCode: number;

  @IsNotEmpty({ message: '专业名称不能为空。' })
  mojarName: string;

  @IsNotEmpty({ message: '学院ID不能为空。' })
  collegeCode: number;
}
