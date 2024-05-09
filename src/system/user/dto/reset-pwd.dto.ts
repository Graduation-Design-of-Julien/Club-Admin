import { IsNotEmpty } from 'class-validator';

export class ResetPwdDto {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  pwd: string;

  @IsNotEmpty()
  comfirm: string;
}
