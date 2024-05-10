import { IsNotEmpty } from 'class-validator';

export class DeleteCollegeDto {
  @IsNotEmpty({ message: '学院ID不能为空。' })
  collegeCode: number;
}
