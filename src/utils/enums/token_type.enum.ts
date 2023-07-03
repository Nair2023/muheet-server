import { registerEnumType } from '@nestjs/graphql';
/**
 * TokenType Enum
 */
export enum TokenTypeEnum {
  access = 'access',
  refresh = 'refresh',
  otp = 'otp',
  temporary_access = 'temporary_access',
  biometric = 'biometric',
}

registerEnumType(TokenTypeEnum, {
  name: 'TokenType',
});
