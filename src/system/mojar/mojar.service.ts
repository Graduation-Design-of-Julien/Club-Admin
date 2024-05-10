import { Injectable } from '@nestjs/common';
import { CreateMojarDto } from './dto/create-mojar.dto';
import { UpdateMojarDto } from './dto/update-mojar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Repository } from 'typeorm';
import { DeleteMojarDto } from './dto/delete-mojar.dto';
import { Mojar } from './entities/mojar.entity';

@Injectable()
export class MojarService {
  constructor(
    @InjectRepository(Mojar)
    private mojarRepository: Repository<Mojar>,
  ) {}

  // 添加专业
  async createMojar(createMojarDto: CreateMojarDto) {
    const result = await this.mojarRepository.save(createMojarDto);
    if (result) {
      return;
    }
  }

  // 获取所有专业
  async getAllMojars() {
    return await this.mojarRepository.find({
      where: { deleted: 0 },
    });
  }

  // 通过 mojarCode 查找专业
  async findMojarByCode(mojarCode: number) {
    return await this.mojarRepository.findOne({
      where: { mojarCode },
    });
  }

  // 通过 mojarName 查找专业
  async findMojarByName(mojarName: string) {
    return await this.mojarRepository.findOne({
      where: { mojarName },
    });
  }

  // 更新专业信息
  async updateMojar(updateMojarDto: UpdateMojarDto) {
    const existMojar = await this.findMojarByCode(updateMojarDto.mojarCode);
    if (existMojar) {
      this.mojarRepository
        .update(
          {
            mojarCode: updateMojarDto.mojarCode,
          },
          { mojarName: updateMojarDto.mojarName },
        )
        .then(() => {
          return;
        })
        .catch(() => {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
            message: '专业更新失败。',
          });
        });
    }
  }

  // 删除专业（逻辑删除）
  async deleteMojar(deleteMojarDto: DeleteMojarDto) {
    const { mojarCode } = deleteMojarDto;
    this.findMojarByCode(mojarCode)
      .then(() => {
        this.mojarRepository
          .update({ mojarCode }, { deleted: 1 })
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
          message: '学院不存在。',
        });
      });
  }
}
