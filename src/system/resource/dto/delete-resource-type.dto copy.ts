import { IsNotEmpty } from 'class-validator';

export class DeleteBorrowDto {
  @IsNotEmpty({ message: '物资类型ID不能为空。' })
  resourceTypeID: string;
}
