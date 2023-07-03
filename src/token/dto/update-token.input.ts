import { CreateTokenInput } from './create-token.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTokenInput extends PartialType(CreateTokenInput) {
  readonly access_token?: string;

  readonly refresh_token?: string;

  readonly temp_token?: string;
}
