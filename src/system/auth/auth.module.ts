import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
