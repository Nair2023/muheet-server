import { InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
} from 'class-validator';
import { AccountTypeEnum } from '../../utils/enums/account_type.enum';
import { AdminRolesEnum } from '../../utils/enums/admin_roles.enum';
import { GenderEnum } from '../../utils/enums/gender.enum';

@InputType()
export class CreateAccountInput {
  @IsString()
  name: string;

  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsString()
  email?: string;

  @IsString()
  mobile?: string;

  @IsString()
  password?: string;

  @IsString()
  google_id?: string;

  @IsString()
  facebook_id?: string;

  @IsString()
  twitter_id?: string;

  @IsString()
  linkedin_id?: string;

  @IsString()
  github_id?: string;

  @IsString()
  biometric_id?: string;

  @IsString()
  apple_id?: string;

  @IsEnum(AccountTypeEnum)
  account_type?: AccountTypeEnum;

  @IsDateString()
  date_of_birth?: Date;

  @IsBoolean()
  signed_up?: boolean;

  @IsEnum(AdminRolesEnum)
  admin_role?: AdminRolesEnum;
}

@InputType()
export class FilterAccountInput {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsString()
  email?: string;

  @IsString()
  mobile?: string;

  @IsString()
  password?: string;

  @IsString()
  google_id?: string;

  @IsString()
  facebook_id?: string;

  @IsString()
  twitter_id?: string;

  @IsString()
  linkedin_id?: string;

  @IsString()
  github_id?: string;

  @IsString()
  biometric_id?: string;

  @IsString()
  apple_id?: string;

  @IsEnum(AccountTypeEnum)
  account_type?: AccountTypeEnum;

  @IsDateString()
  date_of_birth?: Date;

  @IsBoolean()
  signed_up?: boolean;

  @IsEnum(AdminRolesEnum)
  admin_role?: AdminRolesEnum;
}
