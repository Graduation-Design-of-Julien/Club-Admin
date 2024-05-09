import { IsNotEmpty } from 'class-validator';

export class CreateOutboxDto {
  @IsNotEmpty({ message: '标题不能为空。' })
  title: string;

  @IsNotEmpty({ message: '通知内容不能为空。' })
  content: string;

  sender?: string;

  @IsNotEmpty({ message: '发件状态不能为空。' })
  status: number;

  @IsNotEmpty({ message: '收件人不能为空。' })
  recipients: string;
}
