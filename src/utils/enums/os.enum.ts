import { registerEnumType } from '@nestjs/graphql';
/**
 * Operating System Enum
 */
export enum OSEnum {
  ios = 'ios',
  android = 'android',
  browser = 'browser',
}

registerEnumType(OSEnum, {
  name: 'OS',
});
