import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Reminder {
  id: number;
  note_id: number;
  account_id?: number;
  company_id?: number;
  time: Date;
  repeat: boolean;
  deleted_at?: Date;
  is_deleted: boolean;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
  place?: string;
}
