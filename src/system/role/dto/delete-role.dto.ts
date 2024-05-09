import { IsNotEmpty } from 'class-validator';

export class DeleteRoleDto {
  @IsNotEmpty({ message: '职位ID不能为空。' })
  roleCode: number;

  @IsNotEmpty({ message: '删除标记不能为空' })
  deleted: number;
}
