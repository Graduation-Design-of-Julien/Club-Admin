import { IsNotEmpty } from 'class-validator';

export class DeleteDirectionDto {
  @IsNotEmpty({ message: '岗位ID不能为空。' })
  directionCode: number;

  @IsNotEmpty({ message: '删除标记不能为空' })
  deleted: number;
}
