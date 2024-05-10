import { IsNotEmpty } from 'class-validator';

export class DeleteResourceDto {
  @IsNotEmpty({ message: '物资ID不能为空。' })
  resourceID: string;
}
