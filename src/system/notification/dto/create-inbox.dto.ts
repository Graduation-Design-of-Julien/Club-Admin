import { IsNotEmpty } from 'class-validator';

export class CreateInboxDto {
  @IsNotEmpty({ message: '通知ID不能为空。' })
  notificationID: string;

  @IsNotEmpty({ message: '接收人不能为空。' })
  recipientID: string;

  @IsNotEmpty({ message: '收件状态不能为空。' })
  status: number;
}
