import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SystemConfig {
  id: number;
  country_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
