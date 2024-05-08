import { Injectable } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direction } from './entities/direction.entity';
import { Repository } from 'typeorm';
import { DeleteDirectionDto } from './dto/delete-direction.dto';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { BusinessException } from 'src/common/exceptions/business.exception';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(Direction)
    private directionRepository: Repository<Direction>,
  ) {}

  // 添加岗位
  async createDirection(createDirectionDto: CreateDirectionDto) {
    const result = await this.directionRepository.save(createDirectionDto);
    if (result) {
      return;
    }
  }

  // 获取所有岗位
  async getAllDirections() {
    return await this.directionRepository.find();
  }

  // 通过 directionCode 查找岗位
  async findDirectionByCode(directionCode: number) {
    return await this.directionRepository.findOne({
      where: { directionCode },
    });
  }

  // 通过 directionName 查找岗位
  async findDirectionByName(directionName: string) {
    return await this.directionRepository.findOne({
      where: { directionName },
    });
  }

  // 更新岗位信息
  async updateDirection(updateDirectionDto: UpdateDirectionDto) {
    const existDirection = await this.findDirectionByCode(
      updateDirectionDto.directionCode,
    );
    if (existDirection) {
      this.directionRepository
        .update(
          {
            directionCode: updateDirectionDto.directionCode,
          },
          { directionName: updateDirectionDto.directionName },
        )
        .then(() => {
          return;
        })
        .catch(() => {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
            message: '岗位更新失败。',
          });
        });
    }
  }

  // 删除岗位（逻辑删除）
  async deleteDirection(deleteDirectionDto: DeleteDirectionDto) {
    const existDirection = await this.findDirectionByCode(
      deleteDirectionDto.directionCode,
    );
    if (existDirection) {
      const result = await this.directionRepository.remove(existDirection);
      if (result) {
        return;
      }
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.NO_EXIST,
        message: '岗位不存在。',
      });
    }
  }
}
