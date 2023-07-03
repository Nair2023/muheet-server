import { IsInt } from 'class-validator';
import { CreateAccountInput } from './create-account.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @IsInt()
  id: number;
}
