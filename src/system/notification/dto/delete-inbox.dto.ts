import { IsNotEmpty } from 'class-validator';

export class DeleteInboxDto {
  @IsNotEmpty({ message: '通知ID不能为空。' })
  notificationID: string;
}
