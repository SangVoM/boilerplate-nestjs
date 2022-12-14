import { BadRequestException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { createCipheriv, createDecipheriv } from 'crypto';
import { hashSync, compareSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { User } from '../../api/users/entities/user.entity';
import { UsersService } from '../../api/users/users.service';

@Injectable()
export class HashBcrypt {
  private readonly expirationTime: string;
  private readonly expirationTimeRefreshToken: string;
  private readonly secretKey: string;
  private readonly cipherMode: string;
  private readonly cipherKey: string;
  private readonly cipherKeyIV: string;
  private readonly saltRounds = 10;

  constructor(
    readonly configService: ConfigService,
    readonly usersService: UsersService,
  ) {
    this.expirationTime = this.configService.get<string>('EXPIRATION_TIME');
    this.expirationTimeRefreshToken = this.configService.get<string>(
      'EXPIRED_TIME_REFRESH_TOKEN',
    );
    this.secretKey = this.configService.get<string>('SECRET_KEY');
    this.cipherMode = this.configService.get<string>('CIPHER_MODE');
    this.cipherKey = this.configService.get<string>('CIPHER_KEY');
    this.cipherKeyIV = this.configService.get<string>('CIPHER_IV');
  }

  signPayload(payload: any, expiredTime: string) {
    return sign(payload, this.configService.get<string>('SECRET_KEY'), {
      expiresIn: expiredTime,
    });
  }

  decodeJwt(str: string) {
    try {
      return verify(str, this.secretKey);
    } catch (e) {
      return null;
    }
  }

  createTokenAndRefreshToken(idCustomer: mongoose.Types.ObjectId) {
    const token = this.signPayload({ id: idCustomer }, this.expirationTime);
    const refreshToken = this.signPayload(
      { id: idCustomer },
      this.expirationTimeRefreshToken,
    );
    return {
      token,
      refreshToken,
    };
  }

  encodeWithCrypto(myString: string) {
    try {
      const cipher = createCipheriv(
        this.cipherMode,
        this.cipherKey,
        this.cipherKeyIV,
      );
      const encrypted = cipher.update(myString, 'utf8', 'base64');
      return encrypted + cipher.final('base64');
    } catch (error) {
      return null;
    }
  }

  decodeWithCrypto(myStringHash: string) {
    try {
      const decipher = createDecipheriv(
        this.cipherMode,
        this.cipherKey,
        this.cipherKeyIV,
      );
      const decrypted = decipher.update(myStringHash, 'base64', 'utf8');
      return decrypted + decipher.final('utf8');
    } catch (error) {
      return null;
    }
  }

  hashPassword(password: string) {
    const passwordHashWithCrypto = this.encodeWithCrypto(password);
    return hashSync(passwordHashWithCrypto, this.saltRounds);
  }

  comparePassword(password, passwordHash) {
    const passwordHashWithCrypto = this.encodeWithCrypto(password);
    return compareSync(passwordHashWithCrypto, passwordHash);
  }

  compareRefreshToken(refreshToken: string, refreshTokenHash: string) {
    const passwordHashWithCrypto = this.encodeWithCrypto(refreshToken);
    const isValidRefreshToken = compareSync(
      passwordHashWithCrypto,
      refreshTokenHash,
    );

    if (!isValidRefreshToken) {
      throw new BadRequestException('refresh-token-invalid');
    }
  }

  public async handleSaveUserRefreshToken(user: User, refreshToken: string) {
    user.refreshToken = this.hashPassword(refreshToken);
    await this.usersService.update(user._id, { refreshToken });
  }
}
