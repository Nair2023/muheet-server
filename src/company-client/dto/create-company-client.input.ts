import { InputType } from '@nestjs/graphql';
import { IsNumber, IsDateString, IsBoolean } from 'class-validator';

@InputType()
export class CreateCompanyClientInput {
  @IsNumber()
  account_id: number;

  @IsNumber()
  company_id: number;

  @IsDateString()
  deleted_at?: Date;

  @IsBoolean()
  is_deleted: boolean;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}

@InputType()
export class FilterCompanyClientInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsDateString()
  deleted_at?: Date;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;
}
