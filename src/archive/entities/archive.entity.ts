import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Archive {
  id: number;
  account_id?: number;
  company_id?: number;
  created_at: Date;
  updated_at: Date;
}
