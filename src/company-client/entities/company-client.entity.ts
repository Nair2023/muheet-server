import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanyClient {
  id: number;
  account_id: number;
  company_id: number;
  deleted_at?: Date;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
