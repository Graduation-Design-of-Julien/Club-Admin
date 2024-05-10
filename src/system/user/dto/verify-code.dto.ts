import { IsNotEmpty } from 'class-validator';

export class VerifyCodeDto {
  @IsNotEmpty({ message: '手机号不能为空。' })
  phoneNum: string;

  @IsNotEmpty({ message: '验证码不能为空。' })
  verifyCode: string;
}
