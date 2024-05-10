import { IsNotEmpty } from 'class-validator';

export class DeleteApplicationDto {
  @IsNotEmpty({ message: '招新ID不能为空。' })
  applicationID: string;
}
