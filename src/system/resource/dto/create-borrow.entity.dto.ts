import { IsNotEmpty } from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty({ message: '物资ID不能为空。' })
  resourceID: string;

  @IsNotEmpty({ message: '预计归还时间不能为空。' })
  returnTime: Date;
}
