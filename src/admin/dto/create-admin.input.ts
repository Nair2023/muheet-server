import { InputType } from '@nestjs/graphql';
import { IsNumber, IsDateString, IsBoolean, IsEnum } from 'class-validator';
import { AdminRolesEnum } from 'src/utils/enums/admin_roles.enum';

@InputType()
export class CreateAdminInput {
  @IsNumber()
  account_id: number;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at?: Date;

  @IsBoolean()
  is_deleted: boolean;

  @IsDateString()
  deleted_at?: Date;

  @IsEnum(AdminRolesEnum)
  role: AdminRolesEnum;
}

@InputType()
export class FilterAdminInput {
  @IsNumber()
  id?: number;

  @IsNumber()
  account_id?: number;

  @IsDateString()
  created_at?: Date;

  @IsDateString()
  updated_at?: Date;

  @IsBoolean()
  is_deleted?: boolean;

  @IsDateString()
  deleted_at?: Date;

  @IsEnum(AdminRolesEnum)
  role?: AdminRolesEnum;
}
