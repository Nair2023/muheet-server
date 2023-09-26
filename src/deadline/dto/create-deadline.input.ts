import { InputType } from '@nestjs/graphql';
import { IsNumber, IsDateString, IsBoolean } from 'class-validator';

@InputType()
export class CreateDeadlineInput {
  @IsNumber()
  note_id?: number;

  @IsNumber()
  collection_id?: number;

  @IsNumber()
  category_id?: number;

  @IsNumber()
  label_id?: number;

  @IsNumber()
  tag_id?: number;

  @IsDateString()
  time: Date;

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
export class FilterDeadlineInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  note_id?: number;

  @IsNumber()
  collection_id?: number;

  @IsNumber()
  category_id?: number;

  @IsNumber()
  label_id?: number;

  @IsNumber()
  tag_id?: number;

  @IsDateString()
  time?: Date;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsDateString()
  deleted_at?: Date;
}
