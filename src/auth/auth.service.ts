import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@api/user/user.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { RegisterPayloadDto } from './dto/register-payload.dto';
import checkPassword from '@util/check-password.util';
import { HashBcrypt } from '@common/bcrypt/hash.bcrypt';

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly hashBcrypt: HashBcrypt,
  ) {}

  async register(payload: RegisterPayloadDto) {
    await this.validateRegister(
      payload.email,
      payload.password,
      payload.confirmPassword,
    );

    payload.password = this.hashBcrypt.hashPassword(payload.password);
    payload.email = payload.email.toLowerCase();
    const newUser = await this.userService.store(payload);
    const { token } = this.hashBcrypt.createTokenAndRefreshToken(newUser.id);
    return token;
  }

  async login(payload: LoginPayloadDto) {
    const getUser = await this.userService.findOneEmail(payload.email);
    await this.validateLogin(getUser, payload.email, payload.password);
    const { token, refreshToken } = this.hashBcrypt.createTokenAndRefreshToken(
      getUser.id,
    );
    await this.hashBcrypt.handleSaveUserRefreshToken(getUser, refreshToken);

    return { token, refreshToken };
  }

  async validateLogin(getUser: any, email: string, password: string) {
    if (!getUser) {
      throw new UnauthorizedException('login-error');
    }

    if (!checkPassword(password)) {
      throw new BadRequestException('password-error');
    }

    const comparePassword = this.hashBcrypt.comparePassword(
      password,
      getUser.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException('login-error');
    }
  }

  async validateRegister(
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    const getEmail = await this.userService.findOneEmail(email);

    if (getEmail) {
      throw new BadRequestException('email-already');
    }

    if (!checkPassword(password)) {
      throw new BadRequestException('password-error');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('password-not-match-confirm-password');
    }

    return;
  }
}
