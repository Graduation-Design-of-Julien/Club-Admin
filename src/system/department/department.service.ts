import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { DeleteDepartmentDto } from './dto/delete-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  // 添加部门
  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const existDepartment = await this.findDepartmentByName(
      createDepartmentDto.departmentName,
    );
    if (existDepartment) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.EXISTED,
        message: '部门已存在。',
      });
    } else {
      const result = await this.departmentRepository.save(createDepartmentDto);
      if (result) {
        return;
      }
    }
  }

  // 获取所有部门
  async getAllDepartments() {
    return await this.departmentRepository.find({
      where: { deleted: 0 },
    });
  }

  // 通过 departmentCode 查找部门
  async findDepartmentByCode(departmentCode: number) {
    return await this.departmentRepository.findOne({
      where: { departmentCode },
    });
  }

  // 通过 departmentName 查找部门
  async findDepartmentByName(departmentName: string) {
    return await this.departmentRepository.findOne({
      where: { departmentName },
    });
  }

  // 更新部门信息
  async updateDepartment(updateDepartmentDto: UpdateDepartmentDto) {
    const existDepartment = await this.findDepartmentByCode(
      updateDepartmentDto.departmentCode,
    );
    if (existDepartment) {
      this.departmentRepository
        .update(
          {
            departmentCode: updateDepartmentDto.departmentCode,
          },
          { departmentName: updateDepartmentDto.departmentName },
        )
        .then(() => {
          return;
        })
        .catch(() => {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
            message: '部门更新失败。',
          });
        });
    }
  }

  // 删除部门（逻辑删除）
  async deleteDepartment(deleteDepartmentDto: DeleteDepartmentDto) {
    const existDepartment = await this.findDepartmentByCode(
      deleteDepartmentDto.departmentCode,
    );
    if (existDepartment) {
      const result = await this.departmentRepository.remove(existDepartment);
      if (result) {
        return;
      }
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.NO_EXIST,
        message: '部门不存在。',
      });
    }
  }
}
