import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterPayloadDto {
  @Length(1, 30, { message: 'first-name-length-1-30' })
  @IsNotEmpty({ message: 'first-name-not-empty' })
  firstName: string;

  @Length(1, 30, { message: 'first-name-length-1-30' })
  @IsNotEmpty({ message: 'first-name-not-empty' })
  lastName: string;

  @Length(1, 50, { message: 'email-length-1-50' })
  @IsEmail({}, { message: 'email-is-email' })
  email: string;

  @Length(8, 20, { message: 'password-length-8-20' })
  @IsNotEmpty({ message: 'password-not-empty' })
  password: string;

  @Length(8, 20, { message: 'confirm-password-length-8-20' })
  @IsNotEmpty({ message: 'confirm-password-not-empty' })
  confirmPassword: string;

  @Length(10, 20, { message: 'phone-length-8-20' })
  @IsNotEmpty({ message: 'phone-not-empty' })
  phone: string;
}
