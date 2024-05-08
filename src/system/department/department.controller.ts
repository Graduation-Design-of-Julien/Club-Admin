import { Controller, Post, Body } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('create')
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Post('update')
  async update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.updateDepartment(updateDepartmentDto);
  }

  @Post('get')
  async get() {
    return this.departmentService.getAllDepartments();
  }

  @Post('delete')
  async delete(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
    return this.departmentService.deleteDepartment(deleteDepartmentDto);
  }
}
