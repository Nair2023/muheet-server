import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsDateString,
  IsNumber,
  IsBoolean,
  IsString,
  IsJSON,
} from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateNotificationInput {
  @IsDateString()
  deleted_at?: Date;

  @IsDateString()
  updated_at: Date;

  @IsJSON()
  @Field(() => GraphQLJSONObject, { nullable: true })
  params?: Prisma.JsonValue;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsJSON()
  @Field(() => GraphQLJSONObject, { nullable: true })
  translation_params?: Prisma.JsonValue;

  @IsBoolean()
  is_read: boolean;

  @IsBoolean()
  is_deleted: boolean;

  @IsDateString()
  created_at: Date;

  @IsString()
  title: string;

  @IsString()
  body: string;
}

@InputType()
export class FilterNotificationInput {
  @IsDateString()
  deleted_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsNumber()
  id?: number;

  @IsJSON()
  @Field(() => GraphQLJSONObject, { nullable: true })
  params?: Prisma.JsonNullableFilter;

  @IsNumber()
  account_id?: number;

  @IsNumber()
  company_id?: number;

  @IsJSON()
  @Field(() => GraphQLJSONObject, { nullable: true })
  translation_params?: Prisma.JsonNullableFilter;

  @IsBoolean()
  is_read?: boolean;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  created_at?: Date;

  @IsString()
  title?: string;

  @IsString()
  body?: string;
}
