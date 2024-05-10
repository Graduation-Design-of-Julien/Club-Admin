import { Module } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { ApplicationTable } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, ApplicationTable])],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
  exports: [RecruitmentService],
})
export class RecruitmentModule {}
