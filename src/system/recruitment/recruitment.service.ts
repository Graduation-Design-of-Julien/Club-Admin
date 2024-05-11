import { Injectable } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { ApplicationTable } from './entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { DeleteRecruitmentDto } from './dto/delete-recruitment.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { DeleteApplicationDto } from './dto/delete-application.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(ApplicationTable)
    private applicationRepository: Repository<ApplicationTable>,

    @InjectRepository(Recruitment)
    private recruitmentepository: Repository<Recruitment>,
  ) {}

  // 通过ID查询纳新信息
  async findRecruitmentByID(recruitmentID: string) {
    return await this.recruitmentepository.findOne({
      where: { recruitmentID },
    });
  }

  // 获取全部纳新信息
  async getAllRecruitment() {
    return await this.recruitmentepository
      .find({ where: { deleted: 0 } })
      .catch((err) => {
        console.log(err);
      });
  }

  // 创建纳新
  async createRecruitment(createRecruitmentDto: CreateRecruitmentDto) {
    this.recruitmentepository
      .save(createRecruitmentDto)
      .then(() => {
        return;
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.CREATE_FAILED,
          message: '创建纳新信息失败。',
        };
      });
  }

  // 更改纳新信息
  async updateRecruitment(updateRecruitmentDto: UpdateRecruitmentDto) {
    const { recruitmentID } = updateRecruitmentDto;
    this.findRecruitmentByID(recruitmentID)
      .then(() => {
        this.recruitmentepository
          .update({ recruitmentID }, { ...updateRecruitmentDto })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '更新纳新信息失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '纳新信息不存在。',
        };
      });
  }

  // 删除纳新信息
  async deleteRecruitment(deleteRecruitmentDto: DeleteRecruitmentDto) {
    const { recruitmentID } = deleteRecruitmentDto;
    this.findRecruitmentByID(recruitmentID)
      .then(() => {
        this.recruitmentepository
          .update({ recruitmentID }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '删除纳新信息失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '纳新信息不存在。',
        };
      });
  }

  // 获取所有报名信息
  async getAllApplication() {
    return await this.applicationRepository.find({ where: { deleted: 0 } });
  }

  // 通过ID查询报名信息
  async findApplicationByID(applicationID: string) {
    return await this.applicationRepository.findOne({
      where: { applicationID },
    });
  }

  // 报名
  async createApplication(createApplicationDto: CreateApplicationDto) {
    this.applicationRepository
      .save(createApplicationDto)
      .then(() => {
        return;
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.CREATE_FAILED,
          message: '报名失败。',
        };
      });
  }

  // 修改信息
  async updateApplication(updateApplication: UpdateApplicationDto) {
    const { applicationID } = updateApplication;
    this.findApplicationByID(applicationID)
      .then(() => {
        this.applicationRepository
          .update({ applicationID }, { ...updateApplication })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '修改报名信息失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '报名信息不存在。',
        };
      });
  }

  // 删除报名信息
  async deleteApplication(deleteApplicationDto: DeleteApplicationDto) {
    const { applicationID } = deleteApplicationDto;
    this.findApplicationByID(applicationID)
      .then(() => {
        this.applicationRepository
          .update({ applicationID }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch(() => {
            return {
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '删除报名信息失败。',
            };
          });
      })
      .catch(() => {
        return {
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '报名信息不存在。',
        };
      });
  }
}
