import { registerEnumType } from '@nestjs/graphql';
/**
 * Gender Enum
 */
export enum GenderEnum {
  male = 'male',
  female = 'female',
  other = 'other',
}

registerEnumType(GenderEnum, {
  name: 'Gender',
});
