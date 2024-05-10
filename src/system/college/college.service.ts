import { Injectable } from '@nestjs/common';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Repository } from 'typeorm';
import { DeleteCollegeDto } from './dto/delete-college.dto';
import { College } from './entities/college.entity';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private collegeRepository: Repository<College>,
  ) {}

  // 添加学院
  async createCollege(createCollegeDto: CreateCollegeDto) {
    const existCollege = await this.findCollegeByName(
      createCollegeDto.collegeName,
    );
    if (existCollege) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.EXISTED,
        message: '学院已存在。',
      });
    } else {
      const result = await this.collegeRepository.save(createCollegeDto);
      if (result) {
        return;
      }
    }
  }

  // 获取所有学院
  async getAllColleges() {
    return await this.collegeRepository.find({
      where: { deleted: 0 },
    });
  }

  // 通过 collegeCode 查找学院
  async findCollegeByCode(collegeCode: number) {
    return await this.collegeRepository.findOne({
      where: { collegeCode },
    });
  }

  // 通过 collegeName 查找学院
  async findCollegeByName(collegeName: string) {
    return await this.collegeRepository.findOne({
      where: { collegeName },
    });
  }

  // 更新学院信息
  async updateCollege(updateCollegeDto: UpdateCollegeDto) {
    const existCollege = await this.findCollegeByCode(
      updateCollegeDto.collegeCode,
    );
    if (existCollege) {
      this.collegeRepository
        .update(
          {
            collegeCode: updateCollegeDto.collegeCode,
          },
          { collegeName: updateCollegeDto.collegeName },
        )
        .then(() => {
          return;
        })
        .catch(() => {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
            message: '学院更新失败。',
          });
        });
    }
  }

  // 删除学院（逻辑删除）
  async deleteCollege(deleteCollegeDto: DeleteCollegeDto) {
    const existCollege = await this.findCollegeByCode(
      deleteCollegeDto.collegeCode,
    );
    if (existCollege) {
      const result = await this.collegeRepository.remove(existCollege);
      if (result) {
        return;
      }
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.NO_EXIST,
        message: '学院不存在。',
      });
    }
  }
}
