import { Controller, Post, Body, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateOutboxDto } from './dto/create-outbox.dto';
import { UpdateOutboxDto } from './dto/update-outbox.dto';
import { DeleteOutboxDto } from './dto/delete-outbox.dto';
import { RoleAuth } from 'src/common/decorator/public.decorator';
import { USER_ROLE_LEVEL } from 'src/common/constants/user.role.constants';
import { UpdateInboxDto } from './dto/update-inbox.dto';
import { DeleteInboxDto } from './dto/delete-inbox.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  createOutbox(@Request() req, @Body() createOutboxDto: CreateOutboxDto) {
    return this.notificationService.addOutbox(req.user.uid, createOutboxDto);
  }

  @Post('updateSend')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  updateOutbox(@Request() req, @Body() updateOutboxDto: UpdateOutboxDto) {
    return this.notificationService.updateOutbox(req.user.uid, updateOutboxDto);
  }

  @Post('deleteSend')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  deleteOutbox(@Request() req, @Body() deleteOutboxDto: DeleteOutboxDto) {
    return this.notificationService.deleteOutbox(req.user.uid, deleteOutboxDto);
  }

  @Post('getMyOutbox')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  findOutboxBySender(@Request() req) {
    return this.notificationService.findOutboxBySender(req.user.uid);
  }

  @Post('updateRecieve')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  updateInbox(@Request() req, @Body() updateInboxDto: UpdateInboxDto) {
    return this.notificationService.updateInbox(req.user.uid, updateInboxDto);
  }

  @Post('deleteRecieve')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  deleteInbox(@Request() req, @Body() deleteInboxDto: DeleteInboxDto) {
    return this.notificationService.deleteInbox(req.user.uid, deleteInboxDto);
  }

  @Post('getMyInbox')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  findInboxByRecipientID(@Request() req) {
    return this.notificationService.findInboxByRecipientID(req.user.uid);
  }
}
