import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryLabel {
  id: number;
  label_id?: number;
  category_id?: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
