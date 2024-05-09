import { PartialType } from '@nestjs/mapped-types';
import { CreateCollegeDto } from './create-college.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCollegeDto extends PartialType(CreateCollegeDto) {
  @IsNotEmpty({ message: '学院ID不能为空。' })
  collegeCode: number;

  @IsNotEmpty({ message: '学院名称不能为空。' })
  collegeName: string;
}
