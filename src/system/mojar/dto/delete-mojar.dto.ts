import { IsNotEmpty } from 'class-validator';

export class DeleteMojarDto {
  @IsNotEmpty({ message: '专业ID不能为空。' })
  mojarCode: number;
}
