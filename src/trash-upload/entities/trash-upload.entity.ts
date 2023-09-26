import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TrashUpload {
  id: number;
  trash_id?: number;
  upload_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
