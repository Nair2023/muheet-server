import { InputType } from '@nestjs/graphql';
import { IsDateString, IsBoolean, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMeetingInput {
  @IsDateString()
  deleted_at?: Date;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  @IsDateString()
  time: Date;

  @IsBoolean()
  calendar_reminder: boolean;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsBoolean()
  invite_people: boolean;

  @IsBoolean()
  is_deleted: boolean;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  place?: string;
}

@InputType()
export class FilterMeetingInput {
  @IsDateString()
  deleted_at?: Date;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsNumber()
  id?: number;

  @IsDateString()
  time?: Date;

  @IsBoolean()
  calendar_reminder?: boolean;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsBoolean()
  invite_people?: boolean;

  @IsBoolean()
  is_deleted?: boolean;

  @IsString()
  title?: string;

  @IsString()
  body?: string;

  @IsString()
  place?: string;
}
