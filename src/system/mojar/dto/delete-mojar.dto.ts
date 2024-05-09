import { IsNotEmpty } from 'class-validator';

export class DeleteMojarDto {
  @IsNotEmpty({ message: '专业ID不能为空。' })
  mojarCode: number;

  @IsNotEmpty({ message: '删除标记不能为空' })
  deleted: number;
}
