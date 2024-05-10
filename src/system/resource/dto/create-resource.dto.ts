import { IsNotEmpty } from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty({ message: '物资类型ID不能为空。' })
  resourceTypeID: string;

  @IsNotEmpty({ message: '物资名称不能为空。' })
  resourceName: string;
}
