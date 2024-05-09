import { PartialType } from '@nestjs/mapped-types';
import { CreateCollegeDto } from './create-college.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCollegeDto extends PartialType(CreateCollegeDto) {
  @IsNotEmpty({ message: '部门ID不能为空。' })
  collegeCode: number;

  @IsNotEmpty({ message: '部门名称不能为空。' })
  collegeName: string;
}
