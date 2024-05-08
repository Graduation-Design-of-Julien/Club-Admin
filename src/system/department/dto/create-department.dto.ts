import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty({ message: '部门名称不能为空。' })
  departmentName: string;
}
