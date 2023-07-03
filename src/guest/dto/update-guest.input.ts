import { IsInt } from 'class-validator';
import { CreateGuestInput } from './create-guest.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuestInput extends PartialType(CreateGuestInput) {
  @IsInt()
  id: number;
}
