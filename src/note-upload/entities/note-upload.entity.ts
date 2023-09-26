import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NoteUpload {
  id: number;
  note_id?: number;
  upload_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
