import { Injectable } from '@nestjs/common';
import { CreateOutboxDto } from './dto/create-outbox.dto';
import { UpdateOutboxDto } from './dto/update-outbox.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';
import { Repository } from 'typeorm';
import { Outbox } from './entities/outbox.entity';
import { DeleteOutboxDto } from './dto/delete-outbox.dto';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { DeleteInboxDto } from './dto/delete-inbox.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Outbox)
    private outboxRepository: Repository<Outbox>,

    @InjectRepository(Inbox)
    private inboxRepository: Repository<Inbox>,
  ) {}

  // 查询收件箱
  async findInbox(notificationID: string, recipientID: string) {
    return await this.inboxRepository.findOne({
      where: { notificationID, recipientID },
    });
  }

  async findInboxByRecipientID(recipientID: string) {
    return await this.inboxRepository.find({
      where: { recipientID, deleted: 0 },
    });
  }

  // 修改收件信息
  async updateInbox(uid: string, updateInboxDto: UpdateInboxDto) {
    const { notificationID, status } = updateInboxDto;
    this.findInbox(notificationID, uid)
      .then(() => {
        this.inboxRepository
          .update({ notificationID, recipientID: uid }, { status })
          .then(() => {
            return;
          })
          .catch(() => {
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '更新信息失败。',
            });
          });
      })
      .catch(() => {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '通知不存在。',
        });
      });
  }

  // 删除收件信息
  async deleteInbox(uid: string, deleteInboxDto: DeleteInboxDto) {
    const { notificationID } = deleteInboxDto;
    this.findInbox(notificationID, uid)
      .then(() => {
        this.inboxRepository
          .update({ notificationID, recipientID: uid }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch(() => {
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.DELETE_FAILED,
              message: '删除失败。',
            });
          });
      })
      .catch(() => {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '通知不存在。',
        });
      });
  }

  // 循环进行发件
  async _addInbox(notificationID: string, createOutboxDto: CreateOutboxDto) {
    const inboxInfo: CreateInboxDto = {
      notificationID: notificationID,
      status: 1,
      recipientID: '',
    };
    const recipients = JSON.parse(createOutboxDto.recipients);
    for (const key in recipients) {
      const recipientID = recipients[key];
      const result = await this.findInbox(notificationID, recipientID);
      if (!result) {
        inboxInfo.recipientID = recipientID;
        this.addInbox(inboxInfo);
      }
    }
  }

  // 收件
  async addInbox(createInboxDto: CreateInboxDto) {
    const { notificationID, recipientID } = createInboxDto;
    const inboxInfo = await this.findInbox(notificationID, recipientID);
    if (inboxInfo) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.EXISTED,
        message: '通知已存在。',
      });
    } else {
      this.inboxRepository
        .save(createInboxDto)
        .then(() => {
          return;
        })
        .catch((err) => {
          console.log(err);
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.CREATE_FAILED,
            message: '创建收件信息失败。',
          });
        });
    }
  }

  // 查询发件箱
  async findOutboxById(notificationID: string) {
    return await this.outboxRepository.findOne({
      where: { notificationID },
    });
  }

  async findOutboxBySender(sender: string) {
    return await this.outboxRepository.find({
      where: { sender, deleted: 0 },
    });
  }

  // 新建信息
  async addOutbox(uid: string, createOutboxDto: CreateOutboxDto) {
    createOutboxDto.sender = uid;
    const id = String((await this.outboxRepository.count()) + 1).padStart(
      5,
      '0',
    );
    const notificationID = `Notification-${id}`;
    this.outboxRepository
      .save({
        notificationID,
        ...createOutboxDto,
      })
      .then(() => {
        if (createOutboxDto.status != 0) {
          this._addInbox(notificationID, createOutboxDto);
        }
      })
      .catch(() => {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.CREATE_FAILED,
          message: '新建信息失败。',
        });
      });
  }

  // 修改发件信息
  async updateOutbox(uid: string, updateOutboxDto: UpdateOutboxDto) {
    const { notificationID } = updateOutboxDto;
    this.findOutboxById(notificationID)
      .then((res) => {
        if (res.sender != uid) {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.USER_INVALID,
            message: '无法删除他人的发件信息。',
          });
        } else {
          this.outboxRepository
            .update({ notificationID }, { ...updateOutboxDto })
            .then(() => {
              this.findOutboxById(notificationID).then((res) => {
                this._addInbox(notificationID, {
                  title: res.title,
                  content: res.content,
                  recipients: res.recipients,
                  status: res.status,
                }).catch(() => {
                  throw new BusinessException({
                    code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
                    message: '创建收件信息失败。',
                  });
                });
              });
            })
            .catch(() => {
              throw new BusinessException({
                code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
                message: '更新信息失败。',
              });
            });
        }
      })
      .catch(() => {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '通知不存在。',
        });
      });
  }

  // 删除发件信息
  async deleteOutbox(uid: string, deleteOutboxDto: DeleteOutboxDto) {
    const { notificationID } = deleteOutboxDto;
    this.findOutboxById(notificationID)
      .then((res) => {
        if (res.sender != uid) {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.USER_INVALID,
            message: '无法删除他人的收件信息。',
          });
        }
        this.outboxRepository
          .update({ notificationID }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch(() => {
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.DELETE_FAILED,
              message: '删除失败。',
            });
          });
      })
      .catch(() => {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '通知不存在。',
        });
      });
  }
}
