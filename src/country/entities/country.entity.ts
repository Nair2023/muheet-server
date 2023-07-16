import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Country {
  id: number;

  name: string;

  created_at: Date;

  updated_at: Date;

  deleted_at?: Date;

  is_deleted: boolean;
}
