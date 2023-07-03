import { registerEnumType } from '@nestjs/graphql';
/**
 * AccountType Enum
 */
export enum AccountTypeEnum {
  user = 'user',
  admin = 'admin',
}

registerEnumType(AccountTypeEnum, {
  name: 'AccountType',
});
