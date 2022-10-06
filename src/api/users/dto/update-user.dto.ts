import { IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  refreshToken: string;
}