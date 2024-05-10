import { IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  phoneNum: string;
}
