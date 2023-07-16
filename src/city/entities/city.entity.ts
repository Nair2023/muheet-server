import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class City {
  id: number;

  name: string;

  country_id: number;

  created_at: Date;

  updated_at: Date;

  deleted_at?: Date;

  is_deleted: boolean;
}
