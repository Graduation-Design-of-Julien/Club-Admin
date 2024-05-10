import { Controller, Post, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResetPwdDto } from './dto/reset-pwd.dto';
import { LoginUserByPhoneDto, LoginUserByUidDto } from './dto/login-user.dto';
import { Public, RoleAuth } from 'src/common/decorator/public.decorator';
import { USER_ROLE_LEVEL } from 'src/common/constants/user.role.constants';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { CreateVerifyCodeDto } from './dto/create-verify-code.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('update')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(updateUserDto);
  }

  @Post('get')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  async get() {
    return await this.userService.getAllUsers();
  }

  @Post('delete')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  async delete(@Body() deleteUserDto: DeleteUserDto) {
    return await this.userService.deleteUser(deleteUserDto);
  }

  @Post('verifyUser')
  @Public()
  async verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    return await this.userService.verifyUser(verifyUserDto);
  }

  @Post('verifyCode')
  @Public()
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return await this.userService.verifyCode(verifyCodeDto);
  }

  @Post('createVerifyCode')
  @Public()
  async createVerifyCode(@Body() createVerifyCodeDto: CreateVerifyCodeDto) {
    return await this.userService.createVerifyCode(createVerifyCodeDto);
  }

  @Post('resetPwd')
  @Public()
  async resetPwd(@Body() resetPwdDto: ResetPwdDto) {
    return await this.userService.resetPwd(resetPwdDto);
  }

  @Post('login/uid')
  @Public()
  async loginByUid(@Body() loginUserByUidDto: LoginUserByUidDto) {
    return await this.userService.loginByUid(loginUserByUidDto);
  }

  @Post('login/phone')
  @Public()
  async loginByPhone(@Body() loginUserByPhoneDto: LoginUserByPhoneDto) {
    return await this.userService.loginByPhone(loginUserByPhoneDto);
  }

  @Post('getUserInfo')
  async baseInfo(@Request() req) {
    return await this.userService.getUserInfo(req.user.uid);
  }
}
