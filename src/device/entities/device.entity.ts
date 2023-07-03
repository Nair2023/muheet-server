import { ObjectType } from '@nestjs/graphql';
import { LanguageEnum } from '../../utils/enums/language.enum';
import { OSEnum } from '../../utils/enums/os.enum';

@ObjectType()
export class Device {
  id: number;

  account_id?: number;

  guest_id?: number;

  ip?: string;

  fcm_token?: string;

  biometric_public_key?: string;

  notifications_enabled?: boolean;

  os: OSEnum;

  language: LanguageEnum;

  created_at: Date;

  updated_at: Date;

  is_deleted: boolean;

  deleted_at?: Date;
}
