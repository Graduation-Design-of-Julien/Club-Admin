import { Controller, Post, Body, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResetPwdDto } from './dto/reset-pwd.dto';
import { LoginUserByPhoneDto, LoginUserByUidDto } from './dto/login-user.dto';
import { Public, RoleAuth } from 'src/common/decorator/public.decorator';
import { USER_ROLE_LEVEL } from 'src/common/constants/user.role.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('update')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Post('get')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  async get() {
    return this.userService.getAllUsers();
  }

  @Post('delete')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  async delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.deleteUser(deleteUserDto);
  }

  @Post('verify')
  @Public()
  async verifyUser(@Session() session, @Body() verifyDto: VerifyUserDto) {
    return this.userService.verifyUser(session, verifyDto);
  }

  @Post('resetPwd')
  @Public()
  async resetPwd(@Body() resetPwdDto: ResetPwdDto) {
    return this.userService.resetPwd(resetPwdDto);
  }

  @Post('login/uid')
  @Public()
  async loginByUid(@Body() loginUserByUidDto: LoginUserByUidDto) {
    return this.userService.loginByUid(loginUserByUidDto);
  }

  @Post('login/phone')
  @Public()
  async loginByPhone(@Body() loginUserByPhoneDto: LoginUserByPhoneDto) {
    return this.userService.loginByPhone(loginUserByPhoneDto);
  }
}
