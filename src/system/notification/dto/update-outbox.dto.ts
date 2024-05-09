import { PartialType } from '@nestjs/mapped-types';
import { CreateOutboxDto } from './create-outbox.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateOutboxDto extends PartialType(CreateOutboxDto) {
  @IsNotEmpty({ message: '通知ID不能为空。' })
  notificationID: string;

  title?: string;

  content?: string;

  status?: number;

  recipients: string;
}
