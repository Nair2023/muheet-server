import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeadlineFighter {
  id: number;
  deadline_id?: number;
  account_id?: number;
  client_id?: number;
  company_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
