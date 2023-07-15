import { InputType, Field } from '@nestjs/graphql';
import { TokenTypeEnum } from '../../utils/enums/token_type.enum';

@InputType()
export class CreateTokenInput {
  token_data?: string;

  account_id?: number;

  guest_id?: number;

  related_token_id?: number;

  @Field(() => TokenTypeEnum)
  token_type: TokenTypeEnum;

  expiry_date: Date;

  is_deleted?: boolean;

  created_at?: Date;

  updated_at?: Date;
}
