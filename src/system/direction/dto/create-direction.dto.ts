import { IsNotEmpty } from 'class-validator';

export class CreateDirectionDto {
  @IsNotEmpty({ message: '岗位名称不能为空。' })
  directionName: string;

  @IsNotEmpty({ message: '岗位名称不能为空。' })
  departmentCode: number;
}
