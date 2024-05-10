import { IsNotEmpty } from 'class-validator';

export class CreateResourceTypeDto {
  @IsNotEmpty({ message: '物资类型名称不能为空。' })
  resourceTypeName: string;
}
