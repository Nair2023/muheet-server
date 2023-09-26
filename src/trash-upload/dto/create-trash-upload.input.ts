import { InputType } from '@nestjs/graphql';
import { IsNumber, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class CreateTrashUploadInput {
  @IsNumber()
  trash_id?: number;

  @IsNumber()
  upload_id?: number;

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
export class FilterTrashUploadInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  trash_id?: number;

  @IsNumber()
  upload_id?: number;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsDateString()
  deleted_at?: Date;
}
