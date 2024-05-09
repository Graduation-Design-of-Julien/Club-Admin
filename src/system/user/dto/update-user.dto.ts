import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: '用户ID不能为空。' })
  uid: string;

  userName: string;

  sex: string;

  nativePlace: string;

  phoneNum: string;

  email: string;

  cardNum: string;

  avatarUrl: string;

  introduction: string;

  departmentCode: number;

  directionCode: number;

  userRole: number;

  collegeCode: number;

  mojarCode: number;
}
