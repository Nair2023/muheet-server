import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Guest {
  id: number;

  name: string;

  guest_id: string;

  upload_id?: number;

  created_at: Date;

  updated_at: Date;

  deleted_at?: Date;

  is_deleted: boolean;
}
