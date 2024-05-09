import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  uid: string;

  pwd: string;

  @IsNotEmpty({ message: '姓名不能为空。' })
  userName: string;

  sex: string;

  nativePlace: string;

  @IsNotEmpty({ message: '手机号不能为空。' })
  phoneNum: string;

  email: string;

  cardNum: string;

  avatarUrl: string;

  introduction: string;

  @IsNotEmpty({ message: '部门不能为空。' })
  departmentCode: number;

  @IsNotEmpty({ message: '岗位不能为空。' })
  directionCode: number;

  @IsNotEmpty({ message: '职位不能为空。' })
  userRole: number;

  @IsNotEmpty({ message: '学院不能为空。' })
  collegeCode: number;

  @IsNotEmpty({ message: '专业不能为空。' })
  mojarCode: number;
}
