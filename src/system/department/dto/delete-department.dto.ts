import { IsNotEmpty } from 'class-validator';

export class DeleteDepartmentDto {
  @IsNotEmpty({ message: '部门ID不能为空。' })
  departmentCode: number;

  @IsNotEmpty({ message: '删除标记不能为空' })
  deleted: number;
}
