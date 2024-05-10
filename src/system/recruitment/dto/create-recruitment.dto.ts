import { IsNotEmpty } from 'class-validator';

export class CreateRecruitmentDto {
  @IsNotEmpty({ message: '招新名称不能为空。' })
  recruitmentName: string;

  @IsNotEmpty({ message: '招新结束时间不能为空。' })
  recruitmentTime: Date;

  @IsNotEmpty({ message: '招新部门列表不能为空。' })
  recruitmentDepaList: string;

  @IsNotEmpty({ message: '招新岗位列表不能为空。' })
  recruitmentDirecList: string;

  @IsNotEmpty({ message: '招新职位列表不能为空。' })
  recruitmentRoleList: string;

  @IsNotEmpty({ message: '招新学院列表不能为空。' })
  collegeCodeList: string;

  @IsNotEmpty({ message: '招新专业列表不能为空。' })
  mojarCodeList: string;
}
