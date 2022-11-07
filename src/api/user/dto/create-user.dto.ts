import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @Length(0, 30, { message: 'firstName-length-0-30' })
  @IsNotEmpty({ message: 'email-is-not-empty' })
  firstName: string;

  @Length(0, 30, { message: 'firstName-length-0-30' })
  @IsNotEmpty({ message: 'email-is-not-empty' })
  lastName: string;

  @IsEmail({}, { message: 'email-is-email' })
  @IsNotEmpty({ message: 'email-is-not-empty' })
  email: string;

  @Length(8, 20, { message: 'password-length-8-20' })
  @IsNotEmpty({ message: 'password-not-empty' })
  password: string;
}
