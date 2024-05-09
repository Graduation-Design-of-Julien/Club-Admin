import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Repository } from 'typeorm';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  // 添加职位
  async createRole(createRoleDto: CreateRoleDto) {
    const result = await this.roleRepository.save(createRoleDto);
    if (result) {
      return;
    }
  }

  // 获取所有职位
  async getAllRoles() {
    return await this.roleRepository.find();
  }

  // 通过 roleCode 查找职位
  async findRoleByCode(roleCode: number) {
    return await this.roleRepository.findOne({
      where: { roleCode },
    });
  }

  // 通过 roleName 查找职位
  async findRoleByName(roleName: string) {
    return await this.roleRepository.findOne({
      where: { roleName },
    });
  }

  // 更新职位信息
  async updateRole(updateRoleDto: UpdateRoleDto) {
    const existRole = await this.findRoleByCode(updateRoleDto.roleCode);
    if (existRole) {
      this.roleRepository
        .update(
          {
            roleCode: updateRoleDto.roleCode,
          },
          { roleName: updateRoleDto.roleName },
        )
        .then(() => {
          return;
        })
        .catch(() => {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
            message: '职位更新失败。',
          });
        });
    }
  }

  // 删除职位（逻辑删除）
  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    const existRole = await this.findRoleByCode(deleteRoleDto.roleCode);
    if (existRole) {
      const result = await this.roleRepository.remove(existRole);
      if (result) {
        return;
      }
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.NO_EXIST,
        message: '职位不存在。',
      });
    }
  }
}
