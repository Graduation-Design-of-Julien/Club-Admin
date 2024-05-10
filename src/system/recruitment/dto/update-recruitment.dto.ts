import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruitmentDto } from './create-recruitment.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateRecruitmentDto extends PartialType(CreateRecruitmentDto) {
  @IsNotEmpty({ message: '招新ID不能为空。' })
  recruitmentID: string;

  recruitmentName?: string;

  recruitmentTime?: Date;

  recruitmentDepaList?: string;

  recruitmentDirecList?: string;

  recruitmentRoleList?: string;

  collegeCodeList?: string;

  mojarCodeList?: string;

  status?: number;
}
