import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty({ message: '用户ID不能为空。' })
  uid: string;

  @IsNotEmpty({ message: '删除标记不能为空' })
  deleted: number;
}
