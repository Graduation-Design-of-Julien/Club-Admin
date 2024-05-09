import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty } from 'class-validator';
import { CreateInboxDto } from './create-inbox.dto';

export class UpdateInboxDto extends PartialType(CreateInboxDto) {
  @IsNotEmpty({ message: '通知ID不能为空。' })
  notificationID: string;

  @IsNotEmpty({ message: '通知状态不能为空。' })
  status: number;
}
