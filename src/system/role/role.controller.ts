import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Post('update')
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(updateRoleDto);
  }

  @Post('get')
  async get() {
    return this.roleService.getAllRoles();
  }

  @Post('delete')
  async delete(@Body() deleteRoleDto: DeleteRoleDto) {
    return this.roleService.deleteRole(deleteRoleDto);
  }
}
