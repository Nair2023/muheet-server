import { HideField, InputType } from '@nestjs/graphql';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @IsString()
  name: string;

  @IsInt()
  @HideField()
  @ApiHideProperty()
  creator_id: number;
}

@InputType()
export class FilterCompanyInput {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsInt()
  creator_id?: number;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsDateString()
  deleted_at?: Date;
}
