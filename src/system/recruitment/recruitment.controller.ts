import { Controller, Post, Body } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { Public, RoleAuth } from 'src/common/decorator/public.decorator';
import { USER_ROLE_LEVEL } from 'src/common/constants/user.role.constants';
import { DeleteRecruitmentDto } from './dto/delete-recruitment.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { DeleteApplicationDto } from './dto/delete-application.dto';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Post('getAllRecruitment')
  @Public()
  getAllRecruitment() {
    return this.recruitmentService.getAllRecruitment();
  }

  @Post('createRecruitment')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  createRecruitment(@Body() createRecruitmentDto: CreateRecruitmentDto) {
    return this.recruitmentService.createRecruitment(createRecruitmentDto);
  }

  @Post('updateRecruitment')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  updateRecruitment(@Body() updateRecruitment: UpdateRecruitmentDto) {
    return this.recruitmentService.updateRecruitment(updateRecruitment);
  }

  @Post('deleteRecruitment')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  deleteRecruitment(@Body() deleteRecruitmentDto: DeleteRecruitmentDto) {
    return this.recruitmentService.deleteRecruitment(deleteRecruitmentDto);
  }

  @Post('getAllApplication')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_DIRECTOR)
  getAllApplication() {
    return this.recruitmentService.getAllApplication();
  }

  @Post('createApplication')
  @Public()
  createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    return this.recruitmentService.createApplication(createApplicationDto);
  }

  @Post('updateApplication')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  updateApplication(@Body() updateApplicationDto: UpdateApplicationDto) {
    return this.recruitmentService.updateApplication(updateApplicationDto);
  }

  @Post('deleteApplication')
  @RoleAuth(USER_ROLE_LEVEL.DEPUTY_MANAGER)
  deleteApplication(@Body() deleteApplicationDto: DeleteApplicationDto) {
    return this.recruitmentService.deleteApplication(deleteApplicationDto);
  }
}
