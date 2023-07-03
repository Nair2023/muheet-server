import { registerEnumType } from '@nestjs/graphql';
/**
 * Language Enum
 */
export enum LanguageEnum {
  ar = 'ar',
  en = 'en',
}

registerEnumType(LanguageEnum, {
  name: 'Language',
});
