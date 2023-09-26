import { InputType } from '@nestjs/graphql';
import { IsNumber, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class CreateNoteLabelInput {
  @IsNumber()
  note_id?: number;

  @IsNumber()
  label_id?: number;

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
export class FilterNoteLabelInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  note_id?: number;

  @IsNumber()
  label_id?: number;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsDateString()
  deleted_at?: Date;
}
