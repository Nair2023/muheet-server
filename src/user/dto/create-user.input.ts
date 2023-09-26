import { InputType } from '@nestjs/graphql';
import { IsNumber, IsDateString, IsBoolean } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNumber()
  account_id: number;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at?: Date;

  @IsBoolean()
  is_deleted: boolean;

  @IsDateString()
  deleted_at?: Date;
}

@InputType()
export class FilterUserInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  account_id?: number;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  deleted_at?: Date;
}
