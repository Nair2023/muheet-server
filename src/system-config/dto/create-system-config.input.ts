import { InputType } from '@nestjs/graphql';
import { IsNumber, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class CreateSystemConfigInput {
  @IsNumber()
  country_id?: number;

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
export class FilterSystemConfigInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  country_id?: number;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsDateString()
  deleted_at?: Date;
}
