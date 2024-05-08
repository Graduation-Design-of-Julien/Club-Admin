import { IsNotEmpty } from 'class-validator';

export class DeleteDirectionDto {
  @IsNotEmpty({ message: '岗位ID不能为空。' })
  directionCode: number;

  @IsNotEmpty({ message: '岗位名称不能为空。' })
  directionName: string;

  @IsNotEmpty({ message: '删除标记不能为空' })
  deleted: number;
}
