import { InputType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsBoolean, IsString } from 'class-validator';

@InputType()
export class CreateCollectionInput {
  @IsDateString()
  deleted_at?: Date;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsBoolean()
  cooperative: boolean;

  @IsBoolean()
  shared: boolean;

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
export class FilterCollectionInput {
  @IsDateString()
  deleted_at?: Date;

  @IsNumber()
  id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsBoolean()
  cooperative?: boolean;

  @IsBoolean()
  shared?: boolean;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsString()
  name?: string;
}
