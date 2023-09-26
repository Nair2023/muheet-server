import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NoteLabel {
  id: number;
  note_id?: number;
  label_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
