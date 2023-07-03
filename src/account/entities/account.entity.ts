import { ObjectType, Field } from '@nestjs/graphql';
import { AccountTypeEnum } from '../../utils/enums/account_type.enum';
import { GenderEnum } from '../../utils/enums/gender.enum';
import { Tokens } from '../../token/entities/token.entity';
import { IsJSON } from 'class-validator';

@ObjectType()
export class Account {
  id: number;

  name: string;

  @Field(() => GenderEnum, { nullable: true })
  gender?: GenderEnum;

  email?: string;

  mobile?: string;

  password?: string;

  google_id?: string;

  facebook_id?: string;

  twitter_id?: string;

  linkedin_id?: string;

  github_id?: string;

  biometric_id?: string;

  apple_id?: string;

  @Field(() => AccountTypeEnum)
  account_type: AccountTypeEnum;

  date_of_birth?: Date;

  signed_up?: boolean;

  created_at: Date;

  updated_at: Date;

  is_deleted: boolean;

  deleted_at?: Date;

  @IsJSON()
  @Field(() => Tokens, { nullable: true })
  tokens?: Tokens;

  //TODO: Add user and admin entity
}
