import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Label {
  id: number;

  name: string;

  account_id?: number;

  company_id?: number;

  created_at: Date;

  updated_at: Date;

  deleted_at?: Date;

  is_deleted: boolean;

  is_archived: boolean;
}
