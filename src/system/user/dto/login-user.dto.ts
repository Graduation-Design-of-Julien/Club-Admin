import { IsNotEmpty } from 'class-validator';

export class LoginUserByUidDto {
  @IsNotEmpty({ message: '账号不能为空。' })
  uid: string;

  @IsNotEmpty({ message: '密码不能为空。' })
  pwd: string;
}

export class LoginUserByPhoneDto {
  @IsNotEmpty({ message: '手机号不能为空。' })
  phoneNum: string;

  @IsNotEmpty({ message: '密码不能为空。' })
  pwd: string;
}
