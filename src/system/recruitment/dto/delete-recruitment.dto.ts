import { IsNotEmpty } from 'class-validator';

export class DeleteRecruitmentDto {
  @IsNotEmpty({ message: '招新ID不能为空。' })
  recruitmentID: string;
}
