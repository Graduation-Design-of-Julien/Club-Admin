import { IsNotEmpty } from 'class-validator';

export class CreateRecruitmentDto {
  @IsNotEmpty({ message: '招新名称不能为空。' })
  recruitmentName: string;

  @IsNotEmpty({ message: '招新结束时间不能为空。' })
  recruitmentTime: Date;

  recruitmentDepaList: string;

  recruitmentDirecList: string;

  recruitmentRoleList: string;

  collegeCodeList: string;

  mojarCodeList: string;
}
