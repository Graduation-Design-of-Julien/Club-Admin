import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @IsNotEmpty({ message: '部门ID不能为空。' })
  departmentCode: number;

  @IsNotEmpty({ message: '部门名称不能为空。' })
  departmentName: string;
}
