import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Collection {
  deleted_at?: Date;
  id: number;
  account_id?: number;
  company_id?: number;
  cooperative: boolean;
  shared: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  name: string;
}
