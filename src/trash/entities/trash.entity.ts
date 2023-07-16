import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Trash {
  id: number;

  is_empty: boolean;

  account_id?: number;

  company_id?: number;

  created_at: Date;

  updated_at: Date;

  deleted_at?: Date;

  is_deleted: boolean;

  is_archived: boolean;
}
