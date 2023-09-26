import { InputType } from '@nestjs/graphql';
import { IsNumber, IsDateString, IsBoolean, IsString } from 'class-validator';

@InputType()
export class CreateReminderInput {
  @IsNumber()
  note_id: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsDateString()
  time: Date;

  @IsBoolean()
  repeat: boolean;

  @IsDateString()
  deleted_at?: Date;

  @IsBoolean()
  is_deleted: boolean;

  @IsBoolean()
  is_archived: boolean;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsString()
  place?: string;
}

@InputType()
export class FilterReminderInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  note_id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsDateString()
  time?: Date;

  @IsBoolean()
  repeat?: boolean;

  @IsDateString()
  deleted_at?: Date;

  @IsBoolean()
  is_deleted?: boolean;

  @IsBoolean()
  is_archived?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsString()
  place?: string;
}
