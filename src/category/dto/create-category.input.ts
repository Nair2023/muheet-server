import { InputType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsBoolean, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsDateString()
  deleted_at?: Date;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsBoolean()
  is_deleted: boolean;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsString()
  name: string;
}

@InputType()
export class FilterCategoryInput {
  @IsDateString()
  deleted_at?: Date;

  @IsNumber()
  id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsString()
  name?: string;
}
