import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNotEmpty({ message: '职位ID不能为空。' })
  roleCode: number;

  @IsNotEmpty({ message: '职位名称不能为空。' })
  roleName: string;

  @IsNotEmpty({ message: '职位等级不能为空。' })
  roleLevel: number;
}
