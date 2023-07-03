import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class LoginDto {
  @IsString()
  facebook_id?: string;

  @IsString()
  google_id?: string;

  @IsString()
  apple_id?: string;

  @IsString()
  mobile?: string;

  @IsString()
  email?: string;

  @IsString()
  country?: string;

  @IsString()
  password?: string;

  @IsString()
  biometric_id?: string;

  @IsBoolean()
  biometrics_login?: boolean;
}
