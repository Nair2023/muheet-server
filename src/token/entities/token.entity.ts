import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { TokenTypeEnum } from '../../utils/enums/token_type.enum';

@ObjectType()
export class Token {
  id: number;

  token_data?: string;

  account_id?: number;

  guest_id?: number;

  related_token_id?: number;

  @Field(() => TokenTypeEnum)
  tokenType: TokenTypeEnum;

  expiry_date: Date;

  is_deleted: boolean;

  created_at: Date;

  updated_at?: Date;
}

@InputType()
export class TokenFilter {
  id?: number;

  token_data?: string;

  account_id?: number;

  related_token_id?: number;

  @Field(() => TokenTypeEnum, { nullable: true })
  tokenType?: TokenTypeEnum;

  expiry_date?: Date;

  is_deleted?: boolean;

  created_at?: Date;

  updated_at?: Date;
}

@ObjectType()
export class Tokens {
  access_token: string;
  refresh_token: string;
}

@ObjectType()
export class TokenReturn {
  result: boolean;

  @Field(() => Tokens, { nullable: true })
  tokens?: Tokens;
}

@ObjectType()
export class TokenReturnWithGuestId {
  result: boolean;

  @Field(() => Tokens, { nullable: true })
  tokens?: Tokens;

  guest_id: string;

  id: number;
}
