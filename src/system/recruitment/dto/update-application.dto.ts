import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateApplicationDto } from './create-application.dto';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsNotEmpty({ message: '报名ID不能为空。' })
  applicationID: string;

  studentID?: string;

  studentName?: string;

  sex?: string;

  phoneNum?: string;

  collegeCode?: string;

  mojarCode?: string;

  departmentCode?: string;

  directionCode?: string;

  userRole?: string;

  introduction?: string;

  obey?: boolean;
}
