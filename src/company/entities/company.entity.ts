import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  id: number;

  name: string;

  creator_id: number;

  is_deleted: boolean;

  created_at: Date;

  updated_at: Date;

  deleted_at?: Date;
}
