import { InputType } from '@nestjs/graphql';
import { IsNumber, IsBoolean, IsDateString, IsEnum } from 'class-validator';
import { AccountTypeEnum } from 'src/utils/enums/account_type.enum';

@InputType()
export class CreateCompanyUserInput {
  @IsNumber()
  account_id: number;

  @IsNumber()
  company_id: number;

  @IsEnum(AccountTypeEnum)
  account_type: AccountTypeEnum;

  @IsBoolean()
  is_deleted: boolean;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsDateString()
  deleted_at?: Date;
}

@InputType()
export class FilterCompanyUserInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsEnum(AccountTypeEnum)
  account_type: AccountTypeEnum;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsDateString()
  deleted_at?: Date;
}
