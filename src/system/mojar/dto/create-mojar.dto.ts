import { IsNotEmpty } from 'class-validator';

export class CreateMojarDto {
  @IsNotEmpty({ message: '专业名称不能为空。' })
  mojarName: string;

  @IsNotEmpty({ message: '专业名称不能为空。' })
  collegeCode: number;
}
