import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeetingInvitee {
  id: number;
  account_id?: number;
  company_id?: number;
  meeting_id: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
