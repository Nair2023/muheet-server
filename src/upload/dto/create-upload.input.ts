import { InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsString,
} from 'class-validator';
import { UploadTypeEnum } from 'src/utils/enums/upload_type.enum';

@InputType()
export class CreateUploadInput {
  @IsEnum(UploadTypeEnum)
  base_type: UploadTypeEnum;

  @IsDateString()
  updated_at: Date;

  @IsDateString()
  deleted_at?: Date;

  @IsNumber()
  file_size: number;

  @IsBoolean()
  is_delete: boolean;

  @IsDateString()
  created_at: Date;

  @IsString()
  file_name: string;

  @IsString()
  file_type: string;

  @IsString()
  aws_key: string;
}

@InputType()
export class FilterUploadInput {
  @IsEnum(UploadTypeEnum)
  base_type?: UploadTypeEnum;

  @IsDateString()
  updated_at?: Date;

  @IsDateString()
  deleted_at?: Date;

  @IsNumber()
  id?: number;

  @IsNumber()
  file_size?: number;

  @IsBoolean()
  is_delete?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsString()
  file_name?: string;

  @IsString()
  file_type?: string;

  @IsString()
  aws_key?: string;
}
