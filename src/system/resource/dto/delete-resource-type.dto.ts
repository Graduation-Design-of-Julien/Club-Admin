import { IsNotEmpty } from 'class-validator';

export class DeleteResourceTypeDto {
  @IsNotEmpty({ message: '物资类型ID不能为空。' })
  resourceTypeID: string;
}
