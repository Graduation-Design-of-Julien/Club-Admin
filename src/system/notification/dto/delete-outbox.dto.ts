import { IsNotEmpty } from 'class-validator';

export class DeleteOutboxDto {
  @IsNotEmpty({ message: '通知ID不能为空。' })
  notificationID: string;
}
