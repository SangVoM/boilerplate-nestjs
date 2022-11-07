import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashBcrypt } from '@common/bcrypt/hash.bcrypt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@common/jwt/jwt.strategy';
import { UserModule } from '@api/user/user.module';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, HashBcrypt, JwtStrategy],
  exports: [],
})
export class AuthModule {}
