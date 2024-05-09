import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '职位名称不能为空。' })
  roleName: string;

  @IsNotEmpty({ message: '职位等级不能为空。' })
  roleLevel: number;
}
