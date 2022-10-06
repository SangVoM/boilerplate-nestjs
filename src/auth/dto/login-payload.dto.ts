import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginPayloadDto {
  @IsNotEmpty({ message: 'email-not-empty' })
  email: string;

  @IsNotEmpty({ message: 'password-not-empty' })
  @MinLength(8, { message: 'min-length-8' })
  password: string;
}
