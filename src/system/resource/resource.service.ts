import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { ResourceType } from './entities/resuorce.type.entity';
import { ResourceBorrow } from './entities/resource.borrow.entity';
import { CreateResourceTypeDto } from './dto/create-resource-type.dto';
import { UpdateResourceTypeDto } from './dto/update-resource-type.dto';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { DeleteResourceTypeDto } from './dto/delete-resource-type.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { DeleteResourceDto } from './dto/delete-resource.dto';
import { CreateBorrowDto } from './dto/create-borrow.entity.dto';
import { UpdateBorrowDto } from './dto/update-borrow.entity.dto';
import { DeleteBorrowDto } from './dto/delete-borrow.entity.dto';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,

    @InjectRepository(ResourceType)
    private resourceTypeRepository: Repository<ResourceType>,

    @InjectRepository(ResourceBorrow)
    private resourceBorrowRepository: Repository<ResourceBorrow>,
  ) {}

  // 通过ID查找物资类型
  async findResourceTypeByID(resourceTypeID: string) {
    return await this.resourceTypeRepository.findOne({
      where: { resourceTypeID },
    });
  }

  // 获取类型列表
  async getAllResourceType() {
    return await this.resourceTypeRepository.find({ where: { deleted: 0 } });
  }

  // 新建物资类型
  async createResourceType(createResourceTypeDto: CreateResourceTypeDto) {
    return await this.resourceTypeRepository.save(createResourceTypeDto);
  }

  // 更新物资类型
  async updateResourceType(updateResourceTypeDto: UpdateResourceTypeDto) {
    const { resourceTypeID, resourceTypeName } = updateResourceTypeDto;
    this.findResourceTypeByID(resourceTypeID)
      .then(() => {
        this.resourceTypeRepository
          .update({ resourceTypeID }, { resourceTypeName })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '更新失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '物资不存在。',
        };
      });
  }

  // 删除物资类型
  async deleteResourceType(deleteResourceTypeDto: DeleteResourceTypeDto) {
    const { resourceTypeID } = deleteResourceTypeDto;
    this.findResourceTypeByID(resourceTypeID)
      .then(() => {
        this.resourceTypeRepository
          .update({ resourceTypeID }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '删除失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '物资不存在。',
        };
      });
  }

  // 通过ID查找物资
  async findResourceByID(resourceID: string) {
    return await this.resourceRepository.findOne({ where: { resourceID } });
  }

  // 获取所有物资
  async getAllResource() {
    return await this.resourceRepository.find({ where: { deleted: 0 } });
  }

  // 添加物资
  async createResource(createResourceDto: CreateResourceDto) {
    return await this.resourceRepository.save(createResourceDto);
  }

  // 更新物资
  async updateResource(updateResourceDto: UpdateResourceDto) {
    const { resourceTypeID } = updateResourceDto;
    this.findResourceByID(resourceTypeID)
      .then(() => {
        this.resourceRepository
          .update({ resourceTypeID }, { ...updateResourceDto })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '更新失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '物资不存在。',
        };
      });
  }

  // 删除物资
  async deleteResource(deleteResourceDto: DeleteResourceDto) {
    const { resourceID } = deleteResourceDto;
    this.findResourceByID(resourceID)
      .then(() => {
        this.resourceRepository
          .update({ resourceID }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '删除失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '物资不存在。',
        };
      });
  }

  // 通过uid获取借还列表
  async getBorrowByUid(uid: string) {
    return await this.resourceBorrowRepository.find({
      where: { uid, deleted: 0 },
    });
  }

  // 通过提单ID获取借还信息
  async getBorrowByID(borrowedID: string) {
    return await this.resourceBorrowRepository.find({
      where: { borrowedID },
    });
  }

  // 创建借出
  async createBorrow(uid: string, createBorrowDto: CreateBorrowDto) {
    const { resourceID, returnTime } = createBorrowDto;
    this.findResourceByID(resourceID)
      .then((res) => {
        if (res.status == 1) {
          return {
            code: BUSINESS_ERROR_CODE.FAILED,
            message: '该物品已被借出。',
          };
        } else {
          this.resourceBorrowRepository
            .save({
              uid,
              resourceID,
              returnTime,
            })
            .then(() => {
              return;
            })
            .catch(() => {
              return {
                code: BUSINESS_ERROR_CODE.CREATE_FAILED,
                message: '创建借出提单失败。',
              };
            });
        }
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '该物品不存在。',
        };
      });
  }

  // 修改借出
  async updateBorrow(updateBorrowDto: UpdateBorrowDto) {
    const { borrowedID } = updateBorrowDto;
    this.getBorrowByID(borrowedID)
      .then(() => {
        this.resourceBorrowRepository
          .update({ borrowedID }, { ...updateBorrowDto })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '修改借出提单失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '该提单不存在。',
        };
      });
  }

  // 删除借出
  async deleteBorrowDto(deleteBorrowDto: DeleteBorrowDto) {
    const { borrowedID } = deleteBorrowDto;
    this.getBorrowByID(borrowedID)
      .then(() => {
        this.resourceBorrowRepository
          .update({ borrowedID }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '删除失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '物资不存在。',
        };
      });
  }
}
