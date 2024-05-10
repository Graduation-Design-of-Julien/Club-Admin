import { IsNotEmpty } from 'class-validator';

export class DeleteBorrowDto {
  @IsNotEmpty({ message: '提单ID不能为空。' })
  borrowedID: string;
}
