import { InputType } from '@nestjs/graphql';
import { IsNumber, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class CreateClientInput {
  @IsNumber()
  account_id: number;

  @IsNumber()
  company_id: number;

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
export class FilterClientInput {
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

  @IsDateString()
  deleted_at?: Date;
}
