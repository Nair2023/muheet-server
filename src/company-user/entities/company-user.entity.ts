import { ObjectType } from '@nestjs/graphql';
import { AccountTypeEnum } from 'src/utils/enums/account_type.enum';

@ObjectType()
export class CompanyUser {
  id: number;
  account_id: number;
  company_id: number;
  account_type: AccountTypeEnum;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
