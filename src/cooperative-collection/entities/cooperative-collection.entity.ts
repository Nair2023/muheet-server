import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CooperativeCollection {
  id: number;
  collection_id: number;
  account_id?: number;
  company_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
