import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Note {
  id: number;

  title?: string;

  body: string;

  account_id: number;

  collection_id?: number;

  checked?: boolean;

  checkable: boolean;

  cooperative?: boolean;

  shared?: boolean;

  created_at: Date;

  updated_at: Date;

  deleted_at?: Date;

  is_deleted: boolean;

  is_archived: boolean;
}
