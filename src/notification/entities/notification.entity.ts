import { Field, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Notification {
  deleted_at?: Date;
  updated_at: Date;
  id: number;
  @Field(() => GraphQLJSONObject, { nullable: true })
  params: Prisma.JsonValue | null;
  account_id?: number;
  company_id?: number;
  @Field(() => GraphQLJSONObject, { nullable: true })
  translation_params?: Prisma.JsonValue | null;
  is_read: boolean;
  is_deleted: boolean;
  created_at: Date;
  title: string;
  body: string;
}
