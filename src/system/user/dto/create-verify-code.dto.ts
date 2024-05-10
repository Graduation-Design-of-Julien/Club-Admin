import { IsNotEmpty } from 'class-validator';

export class CreateVerifyCodeDto {
  @IsNotEmpty({ message: '手机号不能为空。' })
  phoneNum: string;
}
