import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Meeting {
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
  id: number;
  time: Date;
  calendar_reminder: boolean;
  account_id?: number;
  company_id?: number;
  invite_people: boolean;
  is_deleted: boolean;
  title: string;
  body: string;
  place?: string;
}
