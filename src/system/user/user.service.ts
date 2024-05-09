import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BUSINESS_ERROR_CODE } from 'src/common/constants/business.error.codes.constants';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Repository } from 'typeorm';
import { DeleteUserDto } from '../user/dto/delete-user.dto';
import { User } from './entities/user.entity';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResetPwdDto } from './dto/reset-pwd.dto';
import { LoginUserByPhoneDto, LoginUserByUidDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 添加用户
  async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.findUserByPhone(createUserDto.phoneNum);
    if (existUser) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '该手机号已被注册。',
      });
    } else {
      const id = String((await this.countUser()) + 1).padStart(5, '0');
      createUserDto.uid = `UCS-${id}`;
      const salt = bcrypt.genSaltSync(10);
      if (createUserDto.pwd) {
        const password = bcrypt.hashSync(createUserDto.pwd, salt);
        createUserDto.pwd = password;
      } else {
        const password = bcrypt.hashSync('12345678', salt);
        createUserDto.pwd = password;
        if (
          createUserDto.introduction == void 0 ||
          createUserDto.introduction == ''
        ) {
          createUserDto.introduction = '该用户很懒，还没有自我介绍。';
        }
        this.userRepository
          .save(createUserDto)
          .then((res) => {
            console.log(res);
            return;
          })
          .catch((err) => {
            console.log(err);
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.REGISTER_FAIL,
              message: '添加失败。',
            });
          });
      }
    }
  }

  // 获取所有用户
  async getAllUsers() {
    return await this.userRepository.find({
      select: [
        'uid',
        'userName',
        'sex',
        'phoneNum',
        'nativePlace',
        'introduction',
        'email',
        'avatarUrl',
        'cardNum',
        'collegeCode',
        'mojarCode',
        'departmentCode',
        'directionCode',
        'userRole',
      ],
    });
  }

  // 通过 uid 查找用户
  async findUserByUid(uid: string) {
    return await this.userRepository.findOne({
      where: { uid },
    });
  }

  // 通过 phoneNum 查找用户
  async findUserByPhone(phoneNum: string) {
    return await this.userRepository.findOne({
      where: { phoneNum },
    });
  }

  // 通过 userName 查找用户
  async findUserByName(userName: string) {
    return await this.userRepository.findOne({
      where: { userName },
    });
  }

  // 更新用户信息
  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.findUserByUid(updateUserDto.uid);
    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_INVALID,
        message: '用户不存在。',
      });
    } else {
      for (const key in updateUserDto) {
        if (updateUserDto.hasOwnProperty(key)) {
          if (
            !(
              updateUserDto[key] === null ||
              updateUserDto[key] === undefined ||
              updateUserDto[key] === ''
            )
          ) {
            user[key] = updateUserDto[key];
          }
        }
      }
      this.userRepository
        .save(user)
        .then(() => {
          return;
        })
        .catch(() => {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
            message: '更新用户信息失败。',
          });
        });
    }
  }

  // 删除用户（逻辑删除）
  async deleteUser(deleteUserDto: DeleteUserDto) {
    const existUser = await this.findUserByUid(deleteUserDto.uid);
    if (existUser) {
      const result = await this.userRepository.remove(existUser);
      if (result) {
        return;
      }
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.NO_EXIST,
        message: '用户不存在。',
      });
    }
  }

  // 验证身份
  async verifyUser(session, verifyDto: VerifyUserDto) {
    const { uid, phoneNum, verifyCode } = verifyDto;
    const user = await this.userRepository.findOne({
      where: { uid, phoneNum },
    });
    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.NO_EXIST,
        message: '该用户不存在。',
      });
    } else {
      if (verifyCode) {
        if (verifyCode == session.code) {
          return;
        } else {
          return Math.floor(Math.random() * 1000000);
        }
      }
    }
  }

  // 重置密码
  async resetPwd(resetPwdDto: ResetPwdDto) {
    const { uid, pwd, comfirm } = resetPwdDto;
    const user = await this.findUserByUid(uid);
    if (user) {
      if (comfirm == pwd) {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(pwd, salt);
        this.userRepository
          .update({ uid }, { pwd: password })
          .then(() => {
            return;
          })
          .catch(() => {
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
              message: '重置密码失败。',
            });
          });
      } else {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.UPDATE_FAILED,
          message: '两次密码不一致。',
        });
      }
    }
  }

  getToken(payload: { uid: string }): { accessToken: string } {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  // 通过uid获取有限用户信息
  async getUserInfo(uid: string) {
    return await this.userRepository.find({
      where: { uid },
      select: [
        'uid',
        'userName',
        'sex',
        'phoneNum',
        'nativePlace',
        'introduction',
        'email',
        'avatarUrl',
        'cardNum',
        'collegeCode',
        'mojarCode',
        'departmentCode',
        'directionCode',
        'userRole',
      ],
    });
  }

  // 用户登录
  async loginByUid(loginUserByUidDto: LoginUserByUidDto) {
    const { uid, pwd } = loginUserByUidDto;
    const user = await this.findUserByUid(uid);
    if (user && (await bcrypt.compare(pwd, user.pwd))) {
      const accessToken = this.getToken({ uid: user.uid });
      const userInfo = await this.getUserInfo(user.uid);
      return { user: userInfo[0], ...accessToken };
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_PASSWORD_INVALID,
        message: '账号或密码错误。',
      });
    }
  }

  async loginByPhone(loginUserByPhoneDto: LoginUserByPhoneDto) {
    const { phoneNum, pwd } = loginUserByPhoneDto;
    const user = await this.findUserByUid(phoneNum);
    if (user && (await bcrypt.compare(pwd, user.pwd))) {
      const accessToken = this.getToken({ uid: user.uid });
      return { user: await this.getUserInfo(user.uid), ...accessToken };
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_PASSWORD_INVALID,
        message: '账号或密码错误。',
      });
    }
  }

  // 返回统计数
  async countUser() {
    return this.userRepository.count();
  }
}
