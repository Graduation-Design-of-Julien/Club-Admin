import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty({ message: '学号不能为空。' })
  studentID: string;

  @IsNotEmpty({ message: '姓名不能为空。' })
  studentName: string;

  @IsNotEmpty({ message: '招新ID不能为空。' })
  recruitmentID: string;

  sex?: string;

  @IsNotEmpty({ message: '手机号码不能为空。' })
  phoneNum: string;

  @IsNotEmpty({ message: '学院不能为空。' })
  collegeCode: string;

  @IsNotEmpty({ message: '专业不能为空。' })
  mojarCode: string;

  @IsNotEmpty({ message: '报名部门不能为空。' })
  departmentCode: string;

  @IsNotEmpty({ message: '报名岗位不能为空。' })
  directionCode: string;

  @IsNotEmpty({ message: '报名职位不能为空。' })
  userRole: string;

  introduction?: string;

  @IsNotEmpty({ message: '调剂意愿不能为空。' })
  obey: boolean;
}
