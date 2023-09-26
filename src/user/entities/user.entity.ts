import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: number;
  account_id: number;
  created_at: Date;
  updated_at?: Date;
  is_deleted: boolean;
  deleted_at?: Date;
}
