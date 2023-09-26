import { InputType } from '@nestjs/graphql';
import { IsNumber, IsDateString } from 'class-validator';

@InputType()
export class CreateArchiveInput {
  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}

@InputType()
export class FilterArchiveInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;
}
