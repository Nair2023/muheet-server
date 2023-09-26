import { ObjectType } from '@nestjs/graphql';
import { AdminRolesEnum } from 'src/utils/enums/admin_roles.enum';

@ObjectType()
export class Admin {
  id: number;
  account_id: number;
  created_at: Date;
  updated_at?: Date;
  is_deleted: boolean;
  deleted_at?: Date;
  role: AdminRolesEnum;
}
