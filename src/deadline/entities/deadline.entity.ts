import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Deadline {
  id: number;
  note_id?: number;
  collection_id?: number;
  category_id?: number;
  label_id?: number;
  tag_id?: number;
  time: Date;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
