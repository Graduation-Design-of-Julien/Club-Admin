import { IsNotEmpty } from 'class-validator';

export class DeleteCollegeDto {
  @IsNotEmpty({ message: '学院ID不能为空。' })
  collegeCode: number;

  @IsNotEmpty({ message: '学院名称不能为空。' })
  collegeName: string;

  @IsNotEmpty({ message: '删除标记不能为空' })
  deleted: number;
}
