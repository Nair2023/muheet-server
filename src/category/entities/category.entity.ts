import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  deleted_at?: Date;
  id: number;
  account_id?: number;
  company_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  name: string;
}
