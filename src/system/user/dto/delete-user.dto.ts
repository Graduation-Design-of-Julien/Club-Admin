import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty({ message: '用户ID不能为空。' })
  uid: string;
}
