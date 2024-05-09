import { IsNotEmpty } from 'class-validator';

export class CreateCollegeDto {
  @IsNotEmpty({ message: '学院名称不能为空。' })
  collegeName: string;
}
