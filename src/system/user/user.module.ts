import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { getConfig } from 'src/common/utils/configLoader';
import { VerifyCode } from './entities/verify-code.entity';
const { JWT_CONFIG } = getConfig();

@Module({
  imports: [
    TypeOrmModule.forFeature([User, VerifyCode]),
    JwtModule.register({
      secret: JWT_CONFIG.secretKey,
      signOptions: {
        expiresIn: JWT_CONFIG.expiresTime,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
