import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@api/users/users.service';
import { User } from '@api/users/entities/user.entity';
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
    private readonly usersService: UsersService,
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
    const newUser = await this.usersService.create(payload);
    const { token } = this.hashBcrypt.createTokenAndRefreshToken(newUser._id);
    return token;
  }

  async login(payload: LoginPayloadDto) {
    const getUser = await this.usersService.findOneEmail(payload.email);
    await this.validateLogin(getUser, payload.email, payload.password);
    const { token, refreshToken } = this.hashBcrypt.createTokenAndRefreshToken(
      getUser._id,
    );
    await this.hashBcrypt.handleSaveUserRefreshToken(getUser, refreshToken);

    return { token, refreshToken };
  }

  async validateLogin(getUser: User, email: string, password: string) {
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
    const getEmail = await this.usersService.findOneEmail(email);

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
