import { InputType } from '@nestjs/graphql';
import { IsNumber, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class CreateSharedCollectionInput {
  @IsNumber()
  collection_id: number;

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

  @IsDateString()
  deleted_at?: Date;
}

@InputType()
export class FilterSharedCollectionInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  collection_id?: number;

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
