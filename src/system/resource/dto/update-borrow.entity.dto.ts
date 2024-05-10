import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowDto } from './create-borrow.entity.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBorrowDto extends PartialType(CreateBorrowDto) {
  @IsNotEmpty({ message: '物资ID不能为空。' })
  borrowedID: string;

  resourceID?: string;

  borrowTime?: Date;

  returnTime?: Date;

  realReturnType?: Date;

  isTeturn?: boolean;
}
