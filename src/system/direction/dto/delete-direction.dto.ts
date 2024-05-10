import { IsNotEmpty } from 'class-validator';

export class DeleteDirectionDto {
  @IsNotEmpty({ message: '岗位ID不能为空。' })
  directionCode: number;
}
