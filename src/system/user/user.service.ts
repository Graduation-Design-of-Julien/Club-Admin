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
import { VerifyCode } from './entities/verify-code.entity';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { getConfig } from 'src/common/utils/configLoader';
import { CreateVerifyCodeDto } from './dto/create-verify-code.dto';
const { VERIFY_CONFIG } = getConfig();
import { sendCode } from '../../common/utils/sendSms';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,

    @InjectRepository(VerifyCode)
    private verifyCodeRepository: Repository<VerifyCode>,
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
      where: { deleted: 0 },
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
        'createTime',
        'changeTime',
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
    const { uid } = deleteUserDto;
    await this.findUserByUid(deleteUserDto.uid)
      .then(async () => {
        await this.userRepository
          .update({ uid }, { deleted: 1 })
          .then(() => {
            return;
          })
          .catch((err) => {
            console.log(err);
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.DELETE_FAILED,
              message: '删除失败。',
            });
          });
      })
      .catch((err) => {
        console.log(err);
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.NO_EXIST,
          message: '用户不存在。',
        });
      });
  }

  // 查询验证码
  async findVerifyCodeByPhone(phoneNum: string) {
    return await this.verifyCodeRepository.findOne({ where: { phoneNum } });
  }

  // 创建验证码
  async createVerifyCode(createVerifyCodeDto: CreateVerifyCodeDto) {
    const { phoneNum } = createVerifyCodeDto;
    const code = Math.floor(Math.random() * 1000000);
    await this.findVerifyCodeByPhone(phoneNum).then(async (res) => {
      const time = new Date().getTime() + 60 * 1000 * VERIFY_CONFIG.expiresTime;
      if (res) {
        await this.verifyCodeRepository
          .update(
            { phoneNum },
            { verifyCode: code.toString(), time: time.toString() },
          )
          .then(() => {
            // todo
            sendCode(
              ['+86' + phoneNum],
              code.toString(),
              VERIFY_CONFIG.expiresTime + '',
            );
            console.log(code);
            return;
          })
          .catch(() => {
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.FAILED,
              message: '验证失败。',
            });
          });
      } else {
        this.verifyCodeRepository
          .save({
            phoneNum,
            verifyCode: code.toString(),
            time: time.toString(),
          })
          .then(() => {
            // todo
            console.log(code);
            return;
          })
          .catch(() => {
            throw new BusinessException({
              code: BUSINESS_ERROR_CODE.FAILED,
              message: '验证失败。',
            });
          });
      }
    });
  }

  // 验证身份
  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    const { phoneNum, verifyCode } = verifyCodeDto;
    await this.findVerifyCodeByPhone(phoneNum).then((res) => {
      if (verifyCode == res.verifyCode) {
        if (new Date().getTime() > Number(res.time)) {
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.FAILED,
            message: '验证码已过期。',
          });
        } else {
          return;
        }
      } else {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.FAILED,
          message: '验证码错误。',
        });
      }
    });
  }

  // 验证身份
  async verifyUser(verifyDto: VerifyUserDto) {
    const { uid, phoneNum } = verifyDto;
    const user = await this.userRepository.findOne({
      where: { uid, phoneNum },
    });
    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.NO_EXIST,
        message: '该用户不存在。',
      });
    } else {
      return;
    }
  }

  // 重置密码
  async resetPwd(resetPwdDto: ResetPwdDto) {
    const { uid, pwd, confirm } = resetPwdDto;
    const user = await this.findUserByUid(uid);
    if (user) {
      if (confirm == pwd) {
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

  getToken(payload: { uid: string; userRole: number }): {
    accessToken: string;
  } {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  // 通过uid获取有限用户信息
  async getUserInfo(uid: string) {
    return await this.userRepository.findOne({
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
        'createTime',
        'changeTime',
      ],
    });
  }

  // 用户登录
  async loginByUid(loginUserByUidDto: LoginUserByUidDto) {
    const { uid, pwd } = loginUserByUidDto;
    const user = await this.findUserByUid(uid);
    if (user && (await bcrypt.compare(pwd, user.pwd))) {
      const accessToken = this.getToken({
        uid: user.uid,
        userRole: user.userRole,
      });
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
    const user = await this.findUserByPhone(phoneNum);
    if (user && (await bcrypt.compare(pwd, user.pwd))) {
      const accessToken = this.getToken({
        uid: user.uid,
        userRole: user.userRole,
      });
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
