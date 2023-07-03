import { registerEnumType } from '@nestjs/graphql';
/**
 * AdminRoles Enum
 */
export enum AdminRolesEnum {
  super_admin = 'super_admin',
  admin = 'admin',
}

registerEnumType(AdminRolesEnum, {
  name: 'AdminRoles',
});
