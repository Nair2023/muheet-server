import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator';
import { LanguageEnum } from '../../utils/enums/language.enum';
import { OSEnum } from '../../utils/enums/os.enum';

@InputType()
export class CreateDeviceInput {
  @IsInt()
  account_id?: number;

  @IsInt()
  guest_id?: number;

  @IsString()
  ip?: string;

  @IsString()
  fcm_token?: string;

  @IsString()
  biometric_public_key?: string;

  @IsBoolean()
  notifications_enabled?: boolean;

  @IsEnum(OSEnum)
  os: OSEnum;

  @IsEnum(LanguageEnum)
  language: LanguageEnum;
}

@InputType()
export class FilterDeviceInput {
  @IsInt()
  id?: number;

  @IsInt()
  account_id?: number;

  @IsInt()
  guest_id?: number;

  @IsString()
  ip?: string;

  @IsString()
  fcm_token?: string;

  @IsString()
  biometric_public_key?: string;

  @IsBoolean()
  notifications_enabled?: boolean;

  @IsEnum(OSEnum)
  os?: OSEnum;

  @IsEnum(LanguageEnum)
  language?: LanguageEnum;
}
