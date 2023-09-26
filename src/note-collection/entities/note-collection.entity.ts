import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NoteCollection {
  id: number;
  note_id: number;
  collection_id: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
