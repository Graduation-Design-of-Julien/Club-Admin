import { Controller, Post, Body, Request } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { USER_ROLE_LEVEL } from 'src/common/constants/user.role.constants';
import { RoleAuth } from 'src/common/decorator/public.decorator';
import { CreateResourceTypeDto } from './dto/create-resource-type.dto';
import { UpdateResourceTypeDto } from './dto/update-resource-type.dto';
import { DeleteResourceTypeDto } from './dto/delete-resource-type.dto';
import { DeleteResourceDto } from './dto/delete-resource.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { CreateBorrowDto } from './dto/create-borrow.entity.dto';
import { UpdateBorrowDto } from './dto/update-borrow.entity.dto';
import { DeleteBorrowDto } from './dto/delete-borrow.entity.dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('getResourceType')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  getResourceType() {
    return this.resourceService.getAllResourceType();
  }

  @Post('createResourceType')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  createRosourceType(@Body() createResourceTypeDto: CreateResourceTypeDto) {
    return this.resourceService.createResourceType(createResourceTypeDto);
  }

  @Post('updateResourceType')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  updateResourceType(@Body() updateResourceTypeDto: UpdateResourceTypeDto) {
    return this.resourceService.updateResourceType(updateResourceTypeDto);
  }

  @Post('deleteResourceType')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  deleteResourceType(@Body() deleteResourceTypeDto: DeleteResourceTypeDto) {
    return this.resourceService.deleteResourceType(deleteResourceTypeDto);
  }

  @Post('getResource')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  getResource() {
    return this.resourceService.getAllResourceType();
  }

  @Post('createResource')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  createRosource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.createResource(createResourceDto);
  }

  @Post('updateResource')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  updateResource(@Body() updateResourceDto: UpdateResourceDto) {
    return this.resourceService.updateResource(updateResourceDto);
  }

  @Post('deleteResource')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  deleteResource(@Body() deleteResourceDto: DeleteResourceDto) {
    return this.resourceService.deleteResource(deleteResourceDto);
  }

  @Post('getBorrow')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  getBorrow(@Request() req) {
    return this.resourceService.getBorrowByUid(req.user.uid);
  }

  @Post('createBorrow')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  createBorrow(@Request() req, @Body() createBorrowDto: CreateBorrowDto) {
    return this.resourceService.createBorrow(req.user.uid, createBorrowDto);
  }

  @Post('updateBorrow')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  updateBorrow(@Body() updateBorrowDto: UpdateBorrowDto) {
    return this.resourceService.updateBorrow(updateBorrowDto);
  }

  @Post('deleteBorrow')
  @RoleAuth(USER_ROLE_LEVEL.MEMBER)
  deleteBorrow(@Body() deleteBorrowDto: DeleteBorrowDto) {
    return this.resourceService.deleteBorrowDto(deleteBorrowDto);
  }
}
