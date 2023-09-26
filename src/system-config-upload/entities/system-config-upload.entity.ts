import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SystemConfigUpload {
  id: number;
  upload_id?: number;
  config_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
