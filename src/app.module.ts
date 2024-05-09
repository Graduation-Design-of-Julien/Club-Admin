import { Module } from '@nestjs/common';
import { AuthModule } from './system/auth/auth.module';
import { DepartmentModule } from './system/department/department.module';
import { DirectionModule } from './system/direction/direction.module';
import { RoleModule } from './system/role/role.module';
import { CollegeModule } from './system/college/college.module';
import { MojarModule } from './system/mojar/mojar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './common/utils/configLoader';
import { UserModule } from './system/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';

// load mysql config
const { MYSQL_CONFIG } = getConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...MYSQL_CONFIG,
      synchronize: true,
      retryDelay: 509,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
    AuthModule,
    DepartmentModule,
    DirectionModule,
    RoleModule,
    CollegeModule,
    MojarModule,
    UserModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
