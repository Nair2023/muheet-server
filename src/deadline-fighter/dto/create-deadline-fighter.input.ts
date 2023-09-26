import { InputType } from '@nestjs/graphql';
import { IsNumber, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class CreateDeadlineFighterInput {
  @IsNumber()
  deadline_id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  client_id?: number;

  @IsNumber()
  company_id?: number;

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
export class FilterDeadlineFighterInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  deadline_id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  client_id?: number;

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
